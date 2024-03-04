

# Children Node
echo
echo "Children Node"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectChildNode.sql

# Children NodeEdge
echo
echo "children Node Edge"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectChildNodeEdge.sql

# Undirected Node
echo
echo "Undirected Node"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectUndirectedNode.sql

# Undirected Node Edge
echo
echo "Undirected Node Edge"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectUndirectedNodeEdge.sql



# Parent Node
echo
echo "Parent Node"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectParentNode.sql

# Parent NodeEdge
echo
echo "Parent Node Edge"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectParentNodeEdge.sql




# Review Node
echo
echo "Review Node"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectReviewNode.sql

# Review NodeEdge
echo
echo "Review Node Edge"
sqlite3 ./graph-v0.1-to-v0.2/output.db < ./queries/SelectReviewNodeEdge.sql



