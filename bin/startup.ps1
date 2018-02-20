[Environment]::SetEnvironmentVariable("APP_KEY", "REPLACE_ME");
[Environment]::SetEnvironmentVariable("PREFIX", "!");
[Environment]::SetEnvironmentVariable("POSTGRES_USER", "REPLACE_ME");
[Environment]::SetEnvironmentVariable("POSTGRES_PASSWORD", "REPLACE_ME");
[Environment]::SetEnvironmentVariable("POSTGRES_HOST", "REPLACE_ME");
[Environment]::SetEnvironmentVariable("POSTGRES_PORT", "REPLACE_ME");
[Environment]::SetEnvironmentVariable("POSTGRES_DATABASE", "REPLACE_ME");
[Environment]::SetEnvironmentVariable("LOG_LEVEL", "debug");
[Environment]::SetEnvironmentVariable("SEND_WELCOME_MESSAGE", "false");

npm run start;