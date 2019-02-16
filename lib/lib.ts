export function genRandom(min: number, max: number): number {
    return Math.floor(Math.random() * (++max - min) + min);
}

export function genID(): string {
    function chr4(){
        return Math.random().toString(16).slice(-4);
      }
      return chr4() + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() +
        '-' + chr4() + chr4() + chr4();
}