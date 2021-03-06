import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_apps').del();
  await knex('app_projects').del();
  await knex('modules').del();
  await knex('projects').del();
  await knex('apps').del();
  await knex('users').del();

  // Inserts seed entries
  await knex('users').insert([{ email: 'test@example.com' }]);
  await knex('apps').insert([{ name: 'my app' }]);
  await knex('projects').insert([
    {
      name: 'sorodrigo/embed-source',
      platform: 'github',
      platform_id: 'MDEwOlJlcG9zaXRvcnkzMzY1NDQ1NDE=',
    },
  ]);

  const { id: userId } = await knex('users').first('id');
  const { id: appId } = await knex('apps').first('id');
  const { id: projectId } = await knex('projects').first('id');

  await knex('modules').insert([
    {
      project_id: projectId,
      path: 'src/components/chart/chart.js',
      name: 'chart.js',
      sha: 'dc7102efd44f310fa31bd8c0be13d5db61213486',
    },
  ]);

  await knex('user_apps').insert([{ user_id: userId }]);

  await knex('user_apps').insert([{ app_id: appId, user_id: userId }]);
  await knex('app_projects').insert([{ app_id: appId, project_id: projectId }]);
}
