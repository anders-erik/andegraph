
/*

SOURCE REVIEW SELECTION

*/

-- select sources that are to be reviewed today
SELECT sources.*
FROM sources
INNER JOIN sourceReviewDates
ON sources.id = sourceReviewDates.sourceId
WHERE sourceReviewDates.date = "2023-12-14";







-- ------------------------------------------------------
/*

GENERIC SOURCE SEARCH

*/


-- Select ALL sources
SELECT *
FROM sources;


-- select sources between dates (and including those dates)
-- https://stackoverflow.com/questions/29971762/sqlite-database-select-the-data-between-two-dates
SELECT * FROM sources
WHERE dateCreated
BETWEEN "2023-12-02" AND "2023-12-20";


-- Search source titles
SELECT *
FROM sources
WHERE sources.title LIKE "%ab%";


-- Search source titles between dates
SELECT *
FROM sources
WHERE sources.title LIKE "%ab%";








