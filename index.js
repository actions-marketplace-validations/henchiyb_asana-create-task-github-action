const core = require("@actions/core");
const github = require("@actions/github");
const asana = require("asana");

async function asanaCreateTask(
  asanaSecret,
  projectId,
  workspaceID,
  taskName,
  taskDescription
) {
  try {
    const client = asana.Client.create().useAccessToken(asanaSecret);
    const result = await client.tasks.createTask({
      completed: false,
      name: taskName,
      notes: taskDescription,
      projects: [projectId],
      resource_subtype: "default_task",
      workspace: workspaceID,
    });
    console.log(result);
  } catch (error) {
    core.setFailed(error.message);
  }
}

try {
  const ASANA_SECRET = core.getInput("asana-secret"),
    ASANA_WORKSPACE_ID = core.getInput("asana-workspace-id"),
    ASANA_PROJECT_ID = core.getInput("asana-project_id"),
    ASANA_TASK_NAME = core.getInput("asana-task-name"),
    ASANA_TASK_DESCRIPTION = core.getInput("asana-task-description"),
    PULL_REQUEST = github.context.payload.pull_request;

  if (!ASANA_SECRET) {
    throw { message: "Asana secret Not Found!" };
  }
  taskDescription = `${ASANA_TASK_DESCRIPTION} ${PULL_REQUEST.html_url}`;
  asanaCreateTask(
    ASANA_SECRET,
    ASANA_WORKSPACE_ID,
    ASANA_PROJECT_ID,
    ASANA_TASK_NAME,
    taskDescription
  );
} catch (error) {
  core.error(error.message);
}
