# import sys

# with open(sys.argv[1]) as x: f = x.read().split("::")

# max_passage = 20

# for passage in f:
#     passage_length = len(passage)

#     if passage_length > max_passage:
#         passage_split = passage.split("\n")
#         print(len(passage_split))

if __name__ == "__main__":

    input_filename = "Aztec2.twee"
    output_filename = "test.txt"

    with open(input_filename) as x: f = x.read().split("::")

    passage = f[2]

    passages = divide_passage(passage, 5)

    write_passages(output_filename, passages)


