import sys

with open(sys.argv[1]) as x: f = x.read().split("::")

max_passage = 20

for passage in f:
    passage_length = len(passage)

    if passage_length > max_passage:
        passage_split = passage.split("\n")
        print(len(passage_split))


