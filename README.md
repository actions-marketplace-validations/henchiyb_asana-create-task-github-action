# Asana cerate task javascript action

This action create an asana task for specific project.

## Inputs

## `asana-secret`

**Required** Asana Personal Access Token.

## `asana-workspace-id`

**Required** Your Asana Workspace ID.

## `asana-project-id`

**Required** Your Asana Project ID.

## `asana-task-name`

**Required**  Your Asana Task Name.

## `asana-task-description`

**Required**  Your Asana Task Description.

## Example usage

uses: actions/asana-create-task-github-action@v1.1
with:
  asana-secret: ''
  asana-workspace-id: ''
  asana-project-id: ''
  asana-task-name: ''
  asana-task-description: ''