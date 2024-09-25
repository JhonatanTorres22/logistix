export class Replacement {

    private state: ReplacementState;
    private estado: string;
    approved: boolean;
    constructor() {
        this.approved = false;
        this.state = new Create();
        this.estado = 'Create';
    }

  get getState() {
    return {...this.state};
  }

  get getEstado() {
    return this.estado;
  }

  set setState( state: ReplacementState ) {
    this.state = state;
  }

  set setEstado( estado: string ) {
    this.estado = estado;
  }

  approve( approved: boolean ) {
    return this.state.approve( this, approved );
  }
}


interface ReplacementState {
    approve( replacement: Replacement, approved: boolean ): void;
    // estado: string;
}

export class Create implements ReplacementState {
    approve(replacement: Replacement, approved: boolean): void {
        if( !approved ) {
            console.log('Creación no Aprobada...');
            // return 'Creación No Aprobado';
            // estado = 'Create';
            return;
        }

        replacement.approved = approved;
        replacement.setState = new Assign();
        replacement.setEstado = 'Assign';
        console.log('Create Approved');
        // return 'Create Approved';
    }
    // estado = 'Create';
}

export class Design implements ReplacementState {
    approve(replacement: Replacement, approved: boolean): void {
        if( !approved ) {
            console.log('Diseño no Aprobado...');
            // return 'Design No Aprobado';
            // estado = 'Design';
            return
        }

        replacement.approved = approved;
        replacement.setState = new Assign();
        replacement.setEstado = 'Assign';
        console.log('Design Approved');
        // return 'Design Approved';
    }
    // estado = 'Design';
    
}

export class Assign implements ReplacementState {
    approve(replacement: Replacement, approved: boolean): void {
        if( !approved ) {
            console.log('Asignación no Aprobada...');
            // return 'Design No Aprobado';
            replacement.setState = new Design();
            replacement.setEstado = 'Design';
            return;
        }

        replacement.approved = approved;
        replacement.setState = new Equivalence();
        replacement.setEstado = 'Equivalence';
        console.log('Assign Approved');
        // return 'Asignación Aprobado';
        
    }
}

export class Equivalence implements ReplacementState {
    approve(replacement: Replacement, approved: boolean): void {
        // if( !approved ) {
        //     console.log('Equivalencia no Aprobada...');
        // }

        // replacement.approved = approved;
        // replacement.setState = new Design();
        replacement.setEstado = 'Finish';
        console.log('Equivalence Approved');
        // return 'Equivalencia Aprobado';

        
    }

}