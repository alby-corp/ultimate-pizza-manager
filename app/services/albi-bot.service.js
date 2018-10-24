export const ALBITHOUGHTS = {
    cosing: [
        'Cosa?',
        'Non ho capito',
        'Che cosa vuol dire?'
    ],
    programming: [
        'Chi vuole vedere del bel codice?',
        'quanti magnum vuoi per farlo?',
        'roald mi fixi un bug?',
        'basta che usi un albipattern',
        'hai mai sentito parlare della michael jackson solution?',
        'mi fixi un bug sull\'app delle pizze ? ',
        'cosa devo fare ? il computer non va',
        'blocco la schedina',
        'facciamo un identity server ? '
    ],
    tennis: [
        'ti sfido a tennis'
    ],
    bisiacchery: [
        'non sono bisiacco'
    ],
    misc: [
        'Cioè non è possibile',
        'ti do un magnum',
        'sai che toglieranno la macchinetta del caffè?',
        'ma si dice porcina? dai come cazzo si dice',
        'Scommettiamo?? quanto scommettiamo?'
    ],
    alby: [
        'Alberto 1 Roald 0',
        'Giorgio is a tennis looser',
        'Come si chiama questa mano? TrueTennis!',
        'Come si chiama l\'altra mano? TrueProgramming'
    ]
};

function worthMatching(s1, s2) {
    return s1 && s2 && s1.length > 3 && s2.length > 3;
}

function weakSentenceMatch(s1, s2) {
    if (!worthMatching(s1, s2))
        return 0;

    let affinity = 0;
    for (let w1 of s1.split(' ')) {
        for (let w2 of s2.split(' ')) {
            affinity += weakWordsCompare(w1, w2);
        }
    }

    return affinity;
}

function areContained(w1, w2) {
    return w1.includes(w2) || w2.includes(w1);
}

function weakWordsCompare(w1, w2) {
    if (!worthMatching(w1, w2))
        return 0;

    let affinity = 0;
    for (let i1 = 3; i1 < w1.length; i1++) {
        for (let i2 = 3; i2 < w2.length; i2++) {
            affinity += areContained(w1.substr(0, i1), w2.substr(0, i2));
        }
    }

    return affinity;
}

function exploreThoghtsTree(inputMsg, thoughts, weakSentenceMatch, bestMatch) {
    for (let property in thoughts) {

        if (!thoughts.hasOwnProperty(property)) {
            continue;
        }
        let node = thoughts[property];
        if (Array.isArray(node)) {
            for (let msg of node) {
                let tempAffinity = weakSentenceMatch(inputMsg, msg)*getRandomArbitrary(1,3);
                if (tempAffinity > bestMatch.affinity) {
                    bestMatch.msg = msg;
                    bestMatch.affinity = tempAffinity;
                }

            }
        } else {
            exploreThoghtsTree(inputMsg, thoughts, weakSentenceMatch, node);
        }
    }
}

function cosaProbability() {
    return getRandomArbitrary(1, 3) > 2.5;
}

export function albiReply(inputMsg, thoughts) {

    let result = {
        msg: 'Cosa?',
        affinity: 0
    };

    if (cosaProbability()) {
        exploreThoghtsTree(inputMsg, thoughts, weakSentenceMatch, result);
    }

    return result.msg;
}


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}
