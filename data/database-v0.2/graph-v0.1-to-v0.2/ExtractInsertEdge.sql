

INSERT INTO "Edge" ("Uuid", "Node1Uuid", "Node2Uuid", "Directed", "Order", "Path")
SELECT "id", "node1", "node2", "directed", 0, '/'
FROM "edges";

-- SELECT * FROM Edge;