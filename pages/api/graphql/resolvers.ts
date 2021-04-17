import { Stretch } from '../../../models/stretch.model'
import { Step } from '../../../models/step.model';
export default {
    Query: {
        stretches: async (parent, args, context) => { 
            const stretches = await Stretch.findAll({ include: [Step] });
            return stretches.map(stretch => stretch.toDto());
        },
    }
}