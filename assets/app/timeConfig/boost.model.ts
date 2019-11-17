export class Boost {
    constructor (
        public time: number,
        public duration: number,
        public temperature: number,
        public author: string,
        public boostId?: string){}
}
