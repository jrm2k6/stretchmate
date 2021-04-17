import connectToPostgres from './index';

export default fn => ctx => {
    const db = connectToPostgres();
    return fn({ ...ctx, db });
}

