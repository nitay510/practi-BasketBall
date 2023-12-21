class SubVideoModel  {
    public _id: string;
    public title: string
    public url: string;
    public isPlaying?: boolean;
    public mission1:string;
    public tries?:number;
    public single:boolean;
    public haveForm:boolean;
    public target?:number;
}

export default SubVideoModel;