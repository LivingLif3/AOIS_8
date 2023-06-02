const MEMORY_SIZE = 16

class AccosiativeMemory {
    constructor() {
        this.memoryTable = Array(MEMORY_SIZE).fill(Array(MEMORY_SIZE).fill(0))
        this.diagonalized = false
    }

    reverseDiagonalAdressing() {
        if(!this.diagonalized) {
            return
        }
        let newTable = Array(MEMORY_SIZE).fill(Array(MEMORY_SIZE).fill(0))
        this.transposeMemoryTable()
        for(let i = 0; i < MEMORY_SIZE; i++) {
            newTable[i] = this.wordShift(this.memoryTable[i], -i)
        }

        this.memoryTable = newTable[0].map((value, i) =>
            newTable.map(row => row[i])
        )
        this.diagonalized = false
    }

    diagonalAddressing() {
        if(this.diagonalized) {
            return
        }
        let newTable = Array(MEMORY_SIZE).fill(Array(MEMORY_SIZE).fill(0))
        for(let i = 0; i < MEMORY_SIZE; i++) {
            let newWord = []
            for (let word of this.memoryTable) {
                newWord.push(word[i]);
            }
            newWord = this.wordShift(newWord, i)
            newTable[i]  = newWord
        }
        this.memoryTable = newTable.map(row => [...row])
        this.memoryTable = this.memoryTable[0].map((temp, colIndex) =>
        this.memoryTable.map(row => row[colIndex]))
        this.diagonalized = true
    }

    writeWord(wordIndex, word) {
        if(word.length !== MEMORY_SIZE) {
            console.log("Word must be equal to 16")
            return
        }
        if(!this.diagonalized) {
            this.diagonalAddressing()
        }

        let optimizedWordRepresentation = word.split("")
        for(let i = 0; i < optimizedWordRepresentation.length; i++) {
            optimizedWordRepresentation[i] = Number(optimizedWordRepresentation[i])
        }
        let optimizedTable = []
        for(let i = 0; i < this.memoryTable.length; i++) {
            optimizedTable.push([...this.memoryTable[i]])
        }
        for(let i = 0; i < MEMORY_SIZE; i++) {
            optimizedTable[i][(wordIndex + i) % MEMORY_SIZE] = optimizedWordRepresentation[i]
        }

        this.memoryTable = optimizedTable[0].map((_, colIndex) => optimizedTable.map(row => row[colIndex]))
    }

    readDigitCol(digitColIndex) {
        if (!this.diagonalized) {
            this.diagonalAddressing();
        }
        const optimizedTable = [];
        for (let i = 0; i < this.memoryTable[0].length; i++) {
            const column = [];
            for (let j = 0; j < this.memoryTable.length; j++) {
                column.push(this.memoryTable[j][i]);
            }
            optimizedTable.push(column);
        }
        return this.wordShift(optimizedTable[digitColIndex], -digitColIndex).map(String).join('')
    }


    readWord(wordIndex) {
        if(!this.diagonalized) {
            this.diagonalAddressing()
        }

        const optimizedTable = [];
        for (let i = 0; i < this.memoryTable[0].length; i++) {
            optimizedTable.push(this.memoryTable.map(row => row[i]));
        }

        const returnWord = optimizedTable.map((row, i) => row[(wordIndex + i) % MEMORY_SIZE].toString()).join('');

        return returnWord
    }

    transposeMemoryTable() {
        this.memoryTable = this.memoryTable[0].map((value, i) =>
            this.memoryTable.map(row => row[i])
        )
    }

    wordShift(word, shift) {
        if(shift === -0) {
            shift = 0
        }
        shift = shift % MEMORY_SIZE;
        return word.slice(-shift).concat(word.slice(0, -shift));
    }

    showTable() {
        for(let i = 0; i < this.memoryTable.length; i++) {
            console.log(this.memoryTable[i].join(' '))
        }
    }
}

let main = () => {
    let AM = new AccosiativeMemory()
    for(let i = 0; i < 1; i++) {
        let word = Array.from({length: MEMORY_SIZE},
            () => Math.floor(Math.random() * 2)).join('')
        console.log(`[${i}] ${word}`)
        AM.writeWord(i, word)
    }
    let a = Array.from({length: MEMORY_SIZE},
        () => Math.floor(Math.random() * 2)).join('')
    console.log(a)
    console.log(AM.wordShift(a, -1))

    // console.log('------------------- readWord --------------------')
    // console.log(`Readed word: ${AM.readWord(0)}`)
    // console.log('------------------- readDigitCol --------------------------')
    // for(let i = 0; i < 16; i++) {
    //     console.log(`Readed digitWord: ${AM.readDigitCol(i)}`)
    // }
    // AM.showTable()
    // console.log()
    // AM.reverseDiagonalAdressing()
    // AM.showTable()
    // console.log()
    // AM.diagonalAddressing()
    // AM.showTable()
}

main()


