import { IdGeneratorService } from '../../../services/id-generator/id-generator.service';
import { FdsEntities } from '../../../enums/fds/entities/fds-entities';
import { forEach, last } from 'lodash';

export interface RampObject {
    id: string,
    uuid: string,
    type: string,
    steps: {
        t: number,
        f: number
    }[]
}

export class Ramp {
    private _id: string;
    private _uuid: string;
    private _type: string;
    private _steps: any[];

    constructor(jsonString: string) {

        let base: RampObject;
        base = <RampObject>JSON.parse(jsonString);

        let idGeneratorService = new IdGeneratorService;
        let ramp = FdsEntities.ramp;

        this.id = base.id || '';
        this.uuid = base.uuid || idGeneratorService.genUUID();
        this.type = base.type || 'ramp';

        this.steps = [];
        if (base.steps && base.steps.length > 0) {
            forEach(base.steps, (step) => {
                this.addStep(step.t * 1, step.f * 1);
            });
        } else {
            this.addStep(0,0);
            this.addStep(1,1);
        }
    }

    /**
     * Getter id
     * @return {string}
     */
	public get id(): string {
		return this._id;
	}

    /**
     * Setter id
     * @param {string} value
     */
	public set id(value: string) {
		this._id = value;
	}

    /**
     * Getter uuid
     * @return {string}
     */
	public get uuid(): string {
		return this._uuid;
	}

    /**
     * Setter uuid
     * @param {string} value
     */
	public set uuid(value: string) {
		this._uuid = value;
	}

    /**
     * Getter type
     * @return {string}
     */
	public get type(): string {
		return this._type;
	}

    /**
     * Setter type
     * @param {string} value
     */
	public set type(value: string) {
		this._type = value;
	}

    /**
     * Getter steps
     * @return {any[]}
     */
	public get steps(): any[] {
		return this._steps;
	}

    /**
     * Setter steps
     * @param {any[]} value
     */
	public set steps(value: any[]) {
		this._steps = value;
    }

    /** Add step to ramp */
    public addStep(time?: number, value?: number) {
        if(!time && !value) {
            last(this.steps) ? time = last(this.steps)['t'] + 1 : time = 0;
            last(this.steps) ? value = last(this.steps)['f'] + 1 : value = 0;
        }
        this.steps.push({ 
            t: time * 1, 
            f: value * 1
        });
    }

    /** 
     * Delete step from ramp
     */
    public deleteStep(index: number) {
        this.steps.splice(index, 1);
    }

    /**
     * Genrate JSON
     */
    toJSON(): object {
        let ramp: object = {
            id: this.id,
            uuid: this.uuid,
            type: this.type,
            steps: this.steps
        }
        return ramp;
    }

}
