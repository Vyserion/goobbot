-- Create required core tables
CREATE TABLE IF NOT EXISTS GUILDS (
    ID                  SERIAL  PRIMARY KEY NOT NULL,
    DISCORD_ID          TEXT                NOT NULL,
    NAME                TEXT                NOT NULL
);

-- Create required leaderboard tables
CREATE TABLE IF NOT EXISTS LEADERBOARDS (
    ID                  SERIAL  PRIMARY KEY NOT NULL,
    GUILD_ID            INT                 NOT NULL    REFERENCES GUILDS(ID),
    NAME                TEXT                NOT NULL
);

CREATE TABLE IF NOT EXISTS LEADERBOARD_COLUMNS (
	ID					SERIAL  PRIMARY KEY	NOT NULL,
    LEADERBOARD_ID      INT     		    NOT NULL    REFERENCES LEADERBOARDS(ID),
    NAME                TEXT    		    NOT NULL,
    TYPE                TEXT    	    	NOT NULL
);

CREATE TABLE IF NOT EXISTS LEADERBOARD_ROWS (
	ID					SERIAL  PRIMARY KEY	NOT NULL,
    LEADERBOARD_ID      INT                 NOT NULL    REFERENCES LEADERBOARDS(ID),
    NAME                TEXT    		    NOT NULL
); 

CREATE TABLE IF NOT EXISTS LEADERBOARD_VALUES (
    ID                  SERIAL  PRIMARY KEY NOT NULL,
    LEADERBOARD_COL_ID  INT                 NOT NULL    REFERENCES LEADERBOARD_COLUMNS(ID),
    LEADERBOARD_ROW_ID  INT                 NOT NULL    REFERENCES LEADERBOARD_ROWS(ID),
    VALUE               TEXT,
    UNIQUE(LEADERBOARD_COL_ID, LEADERBOARD_ROW_ID)
);

-- Create required lists tables
CREATE TABLE IF NOT EXISTS LISTS (
    ID                  SERIAL  PRIMARY KEY NOT NULL,
    GUILD_ID            INT                 NOT NULL    REFERENCES GUILDS(ID),
    NAME                TEXT                NOT NULL
);

CREATE TABLE IF NOT EXISTS LIST_VALUE (
    ID                  SERIAL  PRIMARY KEY NOT NULL,
    LIST_ID             INT                 NOT NULL    REFERENCES LISTS(ID),
    VALUE               TEXT                NOT NULL
);