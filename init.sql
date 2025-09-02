CREATE TABLE "users" (
    id VARCHAR(15) PRIMARY KEY,
    username VARCHAR(30) NOT NULL UNIQUE,
    passwd VARCHAR(90) NOT NULL,
    session_version INTEGER NOT NULL DEFAULT 1
);

CREATE TYPE month as ENUM('jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec');
CREATE TYPE activities as ENUM('income','spend');

CREATE TABLE "operations"(
    id VARCHAR(15) PRIMARY KEY,
    user_id VARCHAR(15),
    mon month NOT NULL,
    activity activities NOT NULL,
    details VARCHAR(50),
    amount FLOAT NOT NULL
)