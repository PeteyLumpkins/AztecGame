# import sys

# with open(sys.argv[1]) as x: f = x.read().split("::")

# max_passage = 20

# for passage in f:
#     passage_length = len(passage)

#     if passage_length > max_passage:
#         passage_split = passage.split("\n")
#         print(len(passage_split))

def divide_passage(passage, max_length):

    split_passage = passage.split("\n")

    passages = []
    counter = 0
    new_passage = ""

    for line in split_passage:

        if counter == max_length:
            passages.append(new_passage)
            new_passage = ""
            counter = 0

        new_passage += line + "\n"
        counter += 1

    passages.append(new_passage)

    return passages


def write_passages(filename, passages):

    f1 = open(filename, "w")

    for passage in passages:
        f1.write(passage + "\n")


    pass

if __name__ == "__main__":

    input_filename = "Aztec2.twee"
    output_filename = "test.txt"

    with open(input_filename) as x: f = x.read().split("::")

    passage = f[2]

    passages = divide_passage(passage, 5)

    write_passages(output_filename, passages)


