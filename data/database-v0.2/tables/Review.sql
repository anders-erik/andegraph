

CREATE TABLE IF NOT EXISTS Review (
	"Uuid" INTEGER PRIMARY KEY,
	"Table" TEXT DEFAULT 'Review' NOT NULL, 
	"Type" TEXT DEFAULT '' NOT NULL, 
	"Title" TEXT DEFAULT '' NOT NULL,
	"TimeCreated" INTEGER NOT NULL, 
	"TimeLastChange" INTEGER NOT NULL,
	
	"ReviewDate" TEXT NOT NULL,
	"ReviewCompleted" INTEGER DEFAULT 0 NOT NULL,
	"ReviewCompletedOnDate" TEXT NOT NULL,
	"NodeToReviewUuid" INTEGER NOT NULL
	
);

