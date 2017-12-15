export class MeetingObj {
    geb: string;
    corridor:string;
    floor:string;
    number:string
    xleft: string;
    yleft: string;
    xtop: string;
    ytop: string;
    com: string;
    isFree: string;
    roomId: string;
    description: string;
    capacity: string;
    start: string;
    end: string;
    constructor(){};
    public SetValues(data:{geb: string,
        corridor:string,
        floor:string,
        number:string,
        xleft: string,
        yleft: string,
        xtop: string,
        ytop: string,
        com: string,
        isFree: string,
        roomId: string;
        description: string,
        capacity: string,
        start: string,
        end: string}){
            this.geb = data.geb;
            this.corridor = data.corridor;
            this.floor=data.floor;
            this.number=data.number;
            this.xleft= data.xleft;
            this.yleft= data.yleft;
            this.xtop= data.xtop;
            this.ytop =data.ytop;
            
            this.isFree=data.isFree;
            this.roomId=data.roomId;
            this.description= data.description;
            this.capacity= data.capacity;
            this.start= data.start;
            this.end= data.end;
    }

}