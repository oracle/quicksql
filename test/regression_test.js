#!/usr/bin/env node

import fs from "fs";

import {ddl, toQSQL} from "../src/ddl.js";
import lexer from '../src/lexer.js'
import errorMsgs from '../src/errorMsgs.js'

const mismatches = { 
    "frc_patients_insurance_provider_fk": "frc_patients_insurance_prov_fk", 
    "frc_patient_procedures_id_pk": "frc_patient_proced_id_pk",
    "frc_patient_procedures_patient_id_fk": "frc_patient_pro_patient_id_fk",
    "frc_patient_procedures_i1": "frc_patient_proced_i1",
    "frc_doctor_procedures_id_pk": "frc_doctor_procedu_id_pk",
    "med_coverage_plan_option_id_pk": "med_coverage_plan_id_pk2",
    "med_coverage_plan_option_coverage_plan_id_fk": "med_coverage_coverage_plan_fk",
    "med_coverage_plan_option_i1": "med_coverage_plan_i1",
    "med_users_coverage_plan_option_id_fk":"med_users_coverage_plan_opt_fk",
    // coverage_plan_id               number /fk coverage_plan
    // coverage_plan_option_id        number /fk coverage_plan   ???
    "med_coverage_plan":"med_coverage_plan_option",
    "med_users_i2":"med_users_i112",
    "med_users_i3":"med_users_i123",
    "med_user_claims_receipt_from_id_fk":"med_user_clai_receipt_from_fk",
    "med_user_claim_docs_id_pk":"med_user_claim_doc_id_pk",
    "med_user_claim_docs_claim_fk":"med_user_claim_doc_claim_fk",
    "med_user_claim_docs_i1":"med_user_claim_doc_i1",
    "med_user_claim_notes_id_pk":"med_user_claim_not_id_pk",
    "med_user_claim_notes_claim_fk":"med_user_claim_not_claim_fk",
    "med_user_claim_notes_i1":"med_user_claim_not_i1",
    "med_user_notifications_id_pk":"med_user_notificat_id_pk",
    "session_speakers_session_id_fk":"session_speaker_session_id_fk",
    "session_speakers_speaker_id_fk":"session_speaker_speaker_id_fk",
    "session_speakers_speaker_role_id_fk":"session_speak_speaker_role_fk",
    "session_speakers_i2":"session_speakers_i82",
    "session_speakers_i3":"session_speakers_i93",
}

function compareTokens( so, sc, strict ) {
    let sccontent = sc.value.toLowerCase();
    let socontent = so.value.toLowerCase();
    if( socontent == sccontent )
        return true;
    if( strict == true )
        return false;
    //console.log(socontent+"=?="+sccontent);
    if( socontent.charAt(0) == '\'' && 	sccontent.charAt(0) == '\''	)
        return true;
    if( sc.type == "constant.numeric" && so.type == "constant.numeric" )	
        return true;
    let mismatch =  mismatches[socontent];
    if( mismatch == null )
        return false;
    if( mismatch.toLowerCase() == sccontent )
        return true;
    return false;
}

import checkNoError from './error_msg_tests.js'


function processFile( subdir, file ) {
    if( file.indexOf('.') < 0 ) {
        const files = fs.readdirSync(subdir+file);
        for( let f in files ) {
            let file1 = files[f];
            processFile(subdir+file+'/', file1);
        }        
        return;
    }
    let ext = '.quicksql';
    if( !file.endsWith(ext) ) {
        ext = '.qsql';
        if( !file.endsWith(ext) ) {
            ext = '.json';
            if( !file.endsWith(ext) ) 
                return;
        }
    }
    if( 0 < subdir.indexOf('/experimental/')  )  //  
        return;

    console.log(subdir+file);   

    file = file.substring(0, file.indexOf('.'));

    const text = fs.readFileSync(subdir+file+ext).toString();  

    let output = null;
    if( 0 < subdir.indexOf('/erd/') )
        output = JSON.stringify(new ddl(text).getERD(),null,3);
    else if( ext == '.json' )
        output = toQSQL(text);
    else {
        const parsed = new ddl(text);
        output = parsed.getDDL();
        const errors =  parsed.getErrors(text);
        checkNoError(errors, errorMsgs.messages.misalignedAttribute);
        checkNoError(errors, errorMsgs.messages.undefinedObject);
    }    

    let cmp = null;
    if(  0 < subdir.indexOf('/erd/') )
        cmp = fs.readFileSync(subdir+file+'.erd').toString(); 
    else if( ext == '.json' )
        cmp = fs.readFileSync(subdir+file+'.qsql').toString(); 
    else
        cmp = fs.readFileSync(subdir+file+'.sql').toString(); 

    cmp = cmp.replace(/default on null '0'/g,'default on null  0 ');

    let so= lexer( output, false, true, "" );
    let sc= lexer( cmp, false, true, "" );
    let i = 0;
    while (i < so.length && i < sc.length ) {
        const strict = 0 < subdir.indexOf('/DV/');
        if( !compareTokens(so[i], sc[i], strict) ) {
            //var linec = Service.charPos2LineNo(cmp, sc[i].begin);
            //var linecOffset = Service.lineNo2CharPos(cmp, linec);
            //var lineo = Service.charPos2LineNo(output, so[i].begin);
            //var lineoOffset = Service.lineNo2CharPos(output, lineo);
            console.error("Test# "+file+" : Mismatch at offset# "+so[i].begin+ "("+sc[i].begin+")");
            if( 3 <= i ) {
                console.error(output.substring(so[i-3].end,so[i].end)+"...");
                console.error(cmp.substring(sc[i-3].end,sc[i].end)+"...");
            }
            throw new Error('Test failed');
        }
        i++;
    }
    if( so.length != sc.length ) {
        console.error("length mismatch output="+so.length+" cmp="+sc.length);
        throw new Error('Test failed');
    }

}

// Q: Allowing code to throw if something is wrong. Exit code when throwing
//       is 1 and if everything went fine, exit code will be 0
// A: Then, I would have to process the exit code on return... that is more verbose.
//       Need a concrete example what might get broken.

let t1 = Date.now();

import small_tests from './small_tests.js'
console.log('small_tests.js'); 

import diagram_tests from './diagram_tests.js'
console.log('diagram_tests.js');   

import error_msg_tests from './error_msg_tests.js'
console.log('error_msg_tests.js');   


processFile('./test', '');

console.log("All tests are OK");

console.log( "Time = "+(Date.now()-t1));
console.log( "(Compared with 364-412 ms as of 10/2/2023)");
