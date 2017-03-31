from flask import Flask

app = Flask(__name__)
stream = {}

@app.route("/<input>")
def command(input): 
    if input in stream.keys():
        return stream[input]
    else:
        return page_not_found(404)

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404


if __name__ == "__main__":
    with open('dataMap.txt', 'r') as f:
        for line in f: 
            data = line.split(':')
            stream.update({data[0]: data[1]})

    app.run(host='0.0.0.0', port=8085)