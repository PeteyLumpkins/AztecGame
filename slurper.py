import sys
import re

with open(sys.argv[1]) as x: f = x.read()
passages = re.split("(::.*)", f)

passage_names = passages[1::2]
passage_content = passages[0::2]

max_passage = 20

for passage_index, title_content in enumerate(passage_names):
    passage_title = re.split("::([^{]*)", title_content)
    passage_text = passage_content[passage_index]

    passage_text_array = passage_text.split("\n")
    passage_part_1 = passage_text_array[0: len(passage_text_array) // 2]
    passage_part_2 = passage_text_array[len(passage_text_array) // 2 :]


    passage_part_2_title = "%s %s []" passage_text_array[1]
    print(title_content)
    print(passage_part_1)


    # if passage_length > max_passage:
    #     passage_split = passage.split("\n")
        # print(len(passage_split))


# def divide_passage(passage, max_length):

#     split_passage = passage.split("\n")

#     passages = []
#     counter = 0
#     new_passage = ""

#     for line in split_passage:

#         if counter == max_length:
#             passages.append(new_passage)
#             new_passage = ""
#             counter = 0

#         new_passage += line + "\n"
#         counter += 1

#     passages.append(new_passage)

#     return passages


# def write_passages(filename, passages):

#     f1 = open(filename, "w")

#     for passage in passages:
#         f1.write(passage + "\n")


#     pass

# if __name__ == "__main__":

#     input_filename = "Aztec2.twee"
#     output_filename = "test.txt"

#     with open(input_filename) as x: f = x.read().split("::")

#     passage = f[2]

#     passages = divide_passage(passage, 20)

#     write_passages(output_filename, passages)




