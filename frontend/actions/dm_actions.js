import * as DmApiUtil from '../util/dm_util';
import { getUsersById } from '../actions/session_actions';

export const RECEIVE_DMS = 'RECEIVE_DMS';
export const RECEIVE_DM = 'RECEIVE_DM';
export const RECEIVE_DM_ERRORS = 'RECEIVE_DM_ERRORS';


const receiveDms = dms => ({
    type: RECEIVE_DMS,
    dms
});

const receiveDm = dm => ({
    type: RECEIVE_DM,
    dm
});

const receiveDmErrors = errors => ({
    type: RECEIVE_DM_ERRORS,
    errors
})

// thunk action creators

export const getDms = userId => dispatch => {
    return DmApiUtil.getDms(userId)
        .then(dms => {
            dispatch(receiveDms(dms));
            const member_ids = [];
            Object.keys(dms).forEach(dm => {
                dms[dm].member_ids.forEach(id => {
                    if (!member_ids.includes(id)) {
                        member_ids.push(id);
                    }
                })
            });
            dispatch(getUsersById(member_ids));
        }, 
            errors => dispatch(receiveErrors(errors.responseJSON)));
};

export const getDm = (senderId, recipientId) => dispatch => {
    return DmApiUtil.getDm(senderId, recipientId)
        .then(dm => dispatch(receiveDm(dm), 
            errors => dispatch(receiveErrors(errors.responseJSON))));
};

export const createDm = (senderId, recipientId) => dispatch => {
    return DmApiUtil.createDm(senderId, recipientId)
        .then(dm => dispatch(receiveDm(dm), 
            errors => dispatch(receiveErrors(errors.responseJSON))));
};

