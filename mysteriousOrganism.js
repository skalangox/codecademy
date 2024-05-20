// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

//To ensure no two organisms have the same number
const loggedSpecimenNumbers = [];

const pAequorFactory = (specimenNum, dna) => {
  if (loggedSpecimenNumbers.includes(specimenNum)){
    console.log(`This specimen number is taken!`)
  } else {
    loggedSpecimenNumbers.push(specimenNum)
      return {
    specimenNum,
    dna,
    complementStrand(){
      let complimentaryDNA = [];
      for (let i = 0; i < this.dna.length; i++){
        switch (this.dna[i]){
          case 'A':
            complimentaryDNA.push('T');
            break;
          case 'T':
            complimentaryDNA.push('A');
            break;
          case 'C':
            complimentaryDNA.push('G');
            break;
          case 'G':
            complimentaryDNA.push('C');
            break;
          default: 
            complimentaryDNA.push(this.dna[i])                                     
        }
      }
      return `This Specimen's DNA is [${this.dna}] and it's Complimentary DNA is [${complimentaryDNA}]`
    },
    willLikelySurvive(){
      let numOfCandG = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] !== ('C' || 'G')){
          continue;
        }
        numOfCandG++;
      }
      if (((numOfCandG)/15 * 100) >= 60){
        return true
      } else { return false }
    },
    compareDNA(other){
      let counter = 0;
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] !== other.dna[i]){
          continue;
        }
        counter++
      }
      let percentage = Math.floor((counter/15)*100);
      return `Specimen #${this.specimenNum} and Specimen #${other.specimenNum} have ${percentage}% DNA in common.`;
    },
    mutate(){
      const randIndex = Math.floor(Math.random() * this.dna.length);
      let ogBase = this.dna[randIndex];
      switch (ogBase) {
        case 'A':
          this.dna.splice(randIndex, 1, 'T');
          break;
        case 'T':
          this.dna.splice(randIndex, 1, 'C');
          break;
        case 'C':
          this.dna.splice(randIndex, 1, 'G');
          break;
        default:
          this.dna.splice(randIndex, 1, 'A');
      }
      return this.dna
      }   
    }
  }}

let organismsThatSurvived = [];

//To create a batch of organisms that will survive in their natural environment
const pAequorFactoryBatch = number => {
  let organism = {
    specimenNum: '',
    dna: ''
  };
  for (let i = 1; organismsThatSurvived.length < number; i++) {
    organism = pAequorFactory(i,mockUpStrand());
    let survival = organism.willLikelySurvive();
    if (survival === true) {
      organismsThatSurvived.push(organism)
    }
    continue;
  }
  return organismsThatSurvived
}

// To create a new dna strand.
//console.log(mockUpStrand());
// Then copy results into factory function to keep array constant.

let organism1 = pAequorFactory(1,[ 'A', 'G', 'C', 'C', 'G', 'C', 'C', 'C', 'G', 'A', 'T', 'A', 'A', 'A', 'A' ]);

//let organism2 = pAequorFactory(2,[ 'A', 'A', 'T', 'G', 'A', 'T', 'G', 'T', 'C', 'C', 'T', 'G', 'C', 'G', 'G' ]);

//To check if the mutate method is working.
//console.log(organism1.mutate());

//To check if the compareDNA method is working.
//console.log(organism2.compareDNA(organism1));

//To check if the willLikelySurvive method is working.
//console.log(organism1.willLikelySurvive());

//To check if the pAequorFactoryBatch method is working.
//console.log(pAequorFactoryBatch(30));

//To check if the complementStrand method is working.
//console.log(organism1.complementStrand());
