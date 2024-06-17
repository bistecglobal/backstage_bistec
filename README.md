# Backstage Project

Welcome to the Backstage project! This repository contains the configuration and code for setting up and running a Backstage instance tailored to our organization's needs.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

[Backstage](https://backstage.io/) is an open platform for building developer portals. It unifies all your infrastructure tooling, services, and documentation with a single, consistent UI.

## Features

- **Software Catalog**: Centralized place to manage all your software and services.
- **TechDocs**: Integrated documentation site generator.
- **Kubernetes Monitoring**: View the status of your Kubernetes clusters.
- **API Explorer**: Explore and manage your APIs.
- **CI/CD Integration**: Monitor your CI/CD pipelines and workflows.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14 or later)
- **Yarn** (version 1.22.0 or later)
- **Docker** (for running the database and other services, optional but recommended)

## Installation

To install the Backstage project, follow these steps:

1. **Clone the repository**:

    ```sh
    git clone https://github.com/bistecglobal/backstage_bistec.git
    cd backstage_bistec
    ```

2. **Install dependencies**:

    ```sh
    yarn install
    ```

## Running the Application

To start the Backstage application, use the following commands:

1. **Start the Whole Application**:
    ```sh
    cd backstage_bistec
    yarn dev
    ```

1. **Start the backend Separately**:

    ```sh
    cd packages/backend
    yarn start
    ```

2. **Start the frontend**:

    In a new terminal window, navigate to the root directory and run:

    ```sh
    yarn dev
    ```

3. **Access the application**:

    Open your browser and navigate to `http://localhost:3000`.

## Configuration

Configuration for Backstage is managed through the `app-config.yaml` file. Here are some key sections you might need to update:

- **Database**: Configure the connection to your PostgreSQL database.
- **Authentication**: Set up authentication providers (e.g., GitHub, Google).
- **Plugins**: Enable and configure Backstage plugins as needed.

## Usage

### Adding a New Component

To add a new component to the Backstage catalog:

1. **Create a `catalog-info.yaml` file** in your component's repository:

    ```yaml
    apiVersion: backstage.io/v1alpha1
    kind: Component
    metadata:
      name: my-service
      description: My service description
      owner: team-abc
    spec:
      type: service
      lifecycle: production
    ```

2. **Register the component**:

    - Navigate to the Backstage UI.
    - Go to the **Catalog** section and click **Register Existing Component**.
    - Enter the URL to your `catalog-info.yaml` file.

### Documentation with TechDocs

To add documentation for your components using TechDocs:

1. **Create documentation** in Markdown format within your repository.
2. **Reference the documentation** in your `catalog-info.yaml` file:

    ```yaml
    metadata:
      annotations:
        backstage.io/techdocs-ref: "dir:./docs"
    ```

3. **Build and publish the documentation**:

    ```sh
    yarn techdocs-cli generate --source-dir ./docs --output-dir ./site
    ```

## Contributing

We welcome contributions! To contribute:

1. **Fork the repository**.
2. **Create a feature branch**:

    ```sh
    git checkout -b feature-branch
    ```

3. **Commit your changes**:

    ```sh
    git commit -m 'Add some feature'
    ```

4. **Push to the branch**:

    ```sh
    git push origin feature-branch
    ```

5. **Create a pull request**.

Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for more details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
