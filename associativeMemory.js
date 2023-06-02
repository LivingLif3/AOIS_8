class AssociativeMemory {
    constructor(size) {
        this.tableSize = size
        this.memoryTable = Array(16).fill(Array(16).fill(0))
        for(let i = 0; i < this.tableSize; i++) {
            this.memoryTable[i] = [...this.memoryTable[i]]
        }
    }

    shiftWord(index, word) {
        let shift = (word.length - index)
        let firstPart = word.slice(0, shift)
        let secondPart = word.slice(shift)

        return secondPart.concat(firstPart)
    }

    createEntry(word, index) {
        let shiftedWord = this.shiftWord(index, word)
        for(let i = 0; i < this.memoryTable.length; i++) {
            this.memoryTable[i][index] = shiftedWord[i]
        }
    }

    genRandomWords(size) {
        let words = []

        for(let i = 0; i < size; i++) {
            words.push(Array.from({length: size},
                () => Math.floor(Math.random() * 2)))
        }
        return words
    }

    chooseWord(index) {
        let shiftedWord = this.memoryTable.map(word => word[index]);
        // let word = shiftedWord.slice(0, index).concat(shiftedWord.slice(index))
        let word = shiftedWord.slice(index).concat(shiftedWord.slice(0, index));

        return word
    }

    getWords() {
        let words = []
        for(let i = 0; i < this.tableSize; i++) {
            words.push(this.chooseWord(i))
        }
        this.normalTable = words

        return words
    }

    arithmetics(V) {
        const results = [];
        const list_of_all_words = this.getWords();
        const suitable_words = list_of_all_words.filter(x => x.slice(0, 3).join('') === V.join(''));
        for (let word of suitable_words) {
            const A = word.slice(3, 7);
            const B = word.slice(7, 11);
            results.push(word.slice(0, 11).concat(this.sumPartsOfWords(A, B)));
        }

        const enumerated_results = {};
        for (let i = 0; i < results.length; i++) {
            enumerated_results[i] = results[i];
        }

        return enumerated_results;
    }

    sumPartsOfWords(word1, word2) {
        const el1 = word1.map(x => parseInt(x));
        const el2 = word2.map(x => parseInt(x));
        let result = '';
        let carry = 0;

        while (el1.length && el2.length) {
            const digit1 = el1.pop();
            const digit2 = el2.pop();
            const res = digit1 ^ digit2 ^ carry;
            result = res.toString() + result;
            carry = (digit1 && digit2) || (digit1 ^ digit2) && carry;
        }

        result = carry.toString() + result;
        return result.split('').map(x => parseInt(x));
    }

    closestPatternSearch(pattern) {
        const differences = [];
        for (const word of this.memoryTable) {
            let differenceRank = 0;
            for (let i = 0; i < this.tableSize; i++) {
                differenceRank += word[i] !== pattern[i] ? 1 : 0;
            }
            differences.push([word, differenceRank]);
        }
        const min_difference_rank = Math.min(...differences.map(i => i[1]));
        const filtered_list = differences.filter(i => i[1] === min_difference_rank);
        return filtered_list.map(i => i[0]);
    }

    showTable() {
        for(let i = 0; i < this.tableSize; i++) {
            console.log(this.memoryTable[i].join(" "))
        }
    }

    showNormalTable() {
        let normalTable = this.getWords()
        for(let i = 0; i < normalTable.length; i++) {
            console.log(normalTable[i].join(" "))
        }
    }

    getRazColumn(index) {
        let answer = []
        for(let i = 0; i < this.memoryTable.length; i++) {
            answer.push(this.memoryTable[i][index])
        }
        return [...answer]
    }

    showTable() {
        for(let i = 0; i < this.memoryTable.length; i++) {
            console.log(this.memoryTable[i].join(" "))
        }
    }

    f5(arg1, arg2) {
        return arg2
    }

    f10(arg1, arg2) {
        return arg2.map(x => Number(!x))
    }

    f0() {
        return [0, 0, 0, 0]
    }

    f15() {
        return [1, 1, 1, 1]
    }
}

let main = () => {
    let AM = new AssociativeMemory(16)
    let words = AM.genRandomWords(16)

    console.log('Список слов')
    for(let i = 0; i < 16; i++) {
        AM.createEntry(words[i], i)
    }
    AM.showTable()

    console.log('__________________________________________________________')
    console.log(`Выбранный элемент: ${AM.chooseWord(1)}`)
    console.log(`Вся таблица:`)
    AM.showNormalTable()
    console.log('----------------------------------------------')
    AM.showTable()

    let wordForFind = [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0]
    console.log(`Поиск по соответствию для ${wordForFind.join('')}: ${AM.closestPatternSearch(wordForFind)}`)

    console.log("Логические функции")
    const functions = ['f0', 'f5', 'f10', 'f15']
    console.log(functions[0], AM.f0())
    console.log(AM.memoryTable[1])
    console.log(functions[1], AM.f5(AM.memoryTable[1], AM.memoryTable[2]))
    console.log(functions[2], AM.f10(AM.memoryTable[1], AM.memoryTable[2]))
    console.log(functions[3], AM.f15())

    console.log('sum')
    console.log(AM.arithmetics([1, 0, 1]))
}

main()
