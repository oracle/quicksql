-- create tables
create table speakers (
    id                             number generated by default on null as identity 
                                   constraint speakers_id_pk primary key,
    title                          varchar2(200 char)
)
;

create table speaker_role (
    id                             number generated by default on null as identity 
                                   constraint speaker_role_id_pk primary key,
    name                           varchar2(255 char)
)
;

create table sessions (
    id                             number generated by default on null as identity 
                                   constraint sessions_id_pk primary key,
    name                           varchar2(255 char)
)
;

create table session_speakers (
    id                             number generated by default on null as identity 
                                   constraint session_speakers_id_pk primary key,
    session_id                     number
                                   constraint session_speaker_session_id_fk
                                   references sessions not null,
    speaker_id                     number
                                   constraint session_speaker_speaker_id_fk
                                   references speakers not null,
    speaker_role_id                number
                                   constraint session_speak_speaker_role_fk
                                   references speaker_role not null,
    sort_sequence                  number
)
;

-- table index
create index session_speakers_i1 on session_speakers (session_id);
create index session_speakers_i82 on session_speakers (speaker_id);
create index session_speakers_i93 on session_speakers (speaker_role_id);


-- triggers
create or replace trigger session_speakers_biu
    before insert or update 
    on session_speakers
    for each row
begin
    :new.speaker_id := lower(:new.speaker_id);
end session_speakers_biu;
/


