CREATE TABLE IF NOT EXISTS migration_scripts (
    filename    TEXT PRIMARY KEY NOT NULL,
    run_date    TEXT NOT NULL,
    state       TEXT NOT NULL DEFAULT 'pending'
);
