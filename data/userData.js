const db = require('./dbConfig');

function allResources() {
  return db('resources').select();
}

function createResource(dat) {
  return db('resources').insert(dat);
}

function createProject(dat) {
  const validDat = {...dat};
  validDat.completed = validDat.completed || false;
  return db('projects').insert(validDat);
}

function allProjects() {
  return db('projects').select();
}

function createTask(dat) {
  const validDat = {...dat};
  validDat.completed = validDat.completed || false;
  return db('tasks').insert(validDat);
}

function projectTasks(proj) {
  return db('projects as p')
    .where({ 'p.id': proj })
    .join('tasks as t', 't.project', 'p.id')
    .select('p.name as proj_name', 'p.description as proj_description',
            't.id', 't.description', 't.notes', 't.completed', 't.project as project_id');
}

module.exports = {
  allResources,
  createResource,
  createProject,
  allProjects,
  createTask,
  projectTasks
};
