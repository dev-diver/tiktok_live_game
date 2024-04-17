class Vector{
    constructor({x,y}){
        this.x = x;
        this.y = y;
    }

    add(v){
        this.x = this.x + v.x;
        this.y = this.y + v.y;
        return this
    }
    
    sub(v){
        this.x = this.x - v.x;
        this.y = this.y - v.y
        return this
    }

    mult(n){
        this.x = this.x*n;
        this.y = this.y*n;
        return this
    }

    div(n){
        this.x = this.x/n;
        this.y = this.y/n;
        return this
    }

    mag(){
        return Math.sqrt(this.x*this.x,this.y*this.y)
    }

    normalize(){
        let m = this.mag();
        if(m!=0){
            this.div(m)
        }
        return this
    }

}