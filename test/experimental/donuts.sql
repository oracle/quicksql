drop table donuts cascade constraints;
drop table donuts_batter cascade constraints;
drop table batter cascade constraints;
drop table donuts_topping cascade constraints;
drop table topping cascade constraints;
-- create tables

create table topping (
    id      varchar2(32 char) not null
            constraint topping_id_pk primary key,
    type    varchar2(4000 char)
);


create table batter (
    id      varchar2(32 char) not null
            constraint batter_id_pk primary key,
    type    varchar2(4000 char)
);


create table donuts (
    id      varchar2(32 char) not null
            constraint donuts_id_pk primary key,
    type    varchar2(4000 char),
    name    varchar2(255 char),
    ppu     number
);


create table donuts_batter (
    batter_id    varchar2(32 char)
                 constraint donuts_batter_batter_id_fk
                 references batter,
    donut_id     varchar2(32 char)
                 constraint donuts_batter_donut_id_fk
                 references donuts
);

-- table index
create index donuts_batter_i1 on donuts_batter (batter_id);

create index donuts_batter_i2 on donuts_batter (donut_id);


create table donuts_topping (
    topping_id    varchar2(32 char)
                  constraint donuts_topping_topping_id_fk
                  references topping,
    donut_id      varchar2(32 char)
                  constraint donuts_topping_donut_id_fk
                  references donuts
);

-- table index
create index donuts_topping_i1 on donuts_topping (topping_id);

create index donuts_topping_i2 on donuts_topping (donut_id);



-- load data

insert into topping (
    id,
    type
) values (
    '5001',
    'None'
);
insert into topping (
    id,
    type
) values (
    '5002',
    'Glazed'
);
insert into topping (
    id,
    type
) values (
    '5005',
    'Sugar'
);
insert into topping (
    id,
    type
) values (
    '5007',
    'Powdered Sugar'
);
insert into topping (
    id,
    type
) values (
    '5006',
    'Chocolate with Sprinkles'
);
insert into topping (
    id,
    type
) values (
    '5003',
    'Chocolate'
);
insert into topping (
    id,
    type
) values (
    '5004',
    'Maple'
);

commit;

insert into batter (
    id,
    type
) values (
    '1001',
    'Regular'
);
insert into batter (
    id,
    type
) values (
    '1002',
    'Chocolate'
);
insert into batter (
    id,
    type
) values (
    '1003',
    'Blueberry'
);
insert into batter (
    id,
    type
) values (
    '1004',
    'Devil''s Food'
);

commit;

insert into donuts (
    id,
    type,
    name,
    ppu
) values (
    '0001',
    'donut',
    'Cake',
    0.55
);
insert into donuts (
    id,
    type,
    name,
    ppu
) values (
    '0002',
    'donut',
    'Raised',
    0.55
);
insert into donuts (
    id,
    type,
    name,
    ppu
) values (
    '0003',
    'donut',
    'Old Fashioned',
    0.55
);

commit;

insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1001',
    '0001'
);
insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1002',
    '0001'
);
insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1003',
    '0001'
);
insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1004',
    '0001'
);
insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1001',
    '0002'
);
insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1001',
    '0003'
);
insert into donuts_batter (
    batter_id,
    donut_id
) values (
    '1002',
    '0003'
);

commit;

insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5001',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5002',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5005',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5007',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5006',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5003',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5004',
    '0001'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5001',
    '0002'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5002',
    '0002'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5005',
    '0002'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5003',
    '0002'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5004',
    '0002'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5001',
    '0003'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5002',
    '0003'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5003',
    '0003'
);
insert into donuts_topping (
    topping_id,
    donut_id
) values (
    '5004',
    '0003'
);

commit;


-- Generated by Quick SQL development 1/24/2024, 4:38:58 PM

/*
donuts  /insert 3
   id vc32 /pk
   type vc
   name vc
   ppu num
   donuts_batter /insert 7
      >batter  /insert 4
         id vc32 /pk
         type vc
   donuts_topping /insert 16
      >topping  /insert 7
         id vc32 /pk
         type vc






{
   "donuts_batter": [
      {
         "donut_id": "0001",
         "batter_id": "1001"
      },
      {
         "donut_id": "0001",
         "batter_id": "1002"
      },
      {
         "donut_id": "0001",
         "batter_id": "1003"
      },
      {
         "donut_id": "0001",
         "batter_id": "1004"
      },
      {
         "donut_id": "0002",
         "batter_id": "1001"
      },
      {
         "donut_id": "0003",
         "batter_id": "1001"
      },
      {
         "donut_id": "0003",
         "batter_id": "1002"
      }
   ],
   "batter": [
      {
         "id": "1001",
         "type": "Regular"
      },
      {
         "id": "1002",
         "type": "Chocolate"
      },
      {
         "id": "1003",
         "type": "Blueberry"
      },
      {
         "id": "1004",
         "type": "Devil's Food"
      }
   ],
   "batters": [],
   "donuts_topping": [
      {
         "donut_id": "0001",
         "topping_id": "5001"
      },
      {
         "donut_id": "0001",
         "topping_id": "5002"
      },
      {
         "donut_id": "0001",
         "topping_id": "5005"
      },
      {
         "donut_id": "0001",
         "topping_id": "5007"
      },
      {
         "donut_id": "0001",
         "topping_id": "5006"
      },
      {
         "donut_id": "0001",
         "topping_id": "5003"
      },
      {
         "donut_id": "0001",
         "topping_id": "5004"
      },
      {
         "donut_id": "0002",
         "topping_id": "5001"
      },
      {
         "donut_id": "0002",
         "topping_id": "5002"
      },
      {
         "donut_id": "0002",
         "topping_id": "5005"
      },
      {
         "donut_id": "0002",
         "topping_id": "5003"
      },
      {
         "donut_id": "0002",
         "topping_id": "5004"
      },
      {
         "donut_id": "0003",
         "topping_id": "5001"
      },
      {
         "donut_id": "0003",
         "topping_id": "5002"
      },
      {
         "donut_id": "0003",
         "topping_id": "5003"
      },
      {
         "donut_id": "0003",
         "topping_id": "5004"
      }
   ],
   "topping": [
      {
         "id": "5001",
         "type": "None"
      },
      {
         "id": "5002",
         "type": "Glazed"
      },
      {
         "id": "5005",
         "type": "Sugar"
      },
      {
         "id": "5007",
         "type": "Powdered Sugar"
      },
      {
         "id": "5006",
         "type": "Chocolate with Sprinkles"
      },
      {
         "id": "5003",
         "type": "Chocolate"
      },
      {
         "id": "5004",
         "type": "Maple"
      }
   ],
   "donuts": [
      {
         "id": "0001",
         "type": "donut",
         "name": "Cake",
         "ppu": 0.55
      },
      {
         "id": "0002",
         "type": "donut",
         "name": "Raised",
         "ppu": 0.55
      },
      {
         "id": "0003",
         "type": "donut",
         "name": "Old Fashioned",
         "ppu": 0.55
      }
   ]
}


-- Generated by json2qsql.js development 1/24/2024, 4:38:58 PM



[
   {
      "id": "0001",
      "type": "donut",
      "name": "Cake",
      "ppu": 0.55,
      "batters": {
         "batter": [
            {
               "id": "1001",
               "type": "Regular"
            },
            {
               "id": "1002",
               "type": "Chocolate"
            },
            {
               "id": "1003",
               "type": "Blueberry"
            },
            {
               "id": "1004",
               "type": "Devil's Food"
            }
         ]
      },
      "topping": [
         {
            "id": "5001",
            "type": "None"
         },
         {
            "id": "5002",
            "type": "Glazed"
         },
         {
            "id": "5005",
            "type": "Sugar"
         },
         {
            "id": "5007",
            "type": "Powdered Sugar"
         },
         {
            "id": "5006",
            "type": "Chocolate with Sprinkles"
         },
         {
            "id": "5003",
            "type": "Chocolate"
         },
         {
            "id": "5004",
            "type": "Maple"
         }
      ]
   },
   {
      "id": "0002",
      "type": "donut",
      "name": "Raised",
      "ppu": 0.55,
      "batters": {
         "batter": [
            {
               "id": "1001",
               "type": "Regular"
            }
         ]
      },
      "topping": [
         {
            "id": "5001",
            "type": "None"
         },
         {
            "id": "5002",
            "type": "Glazed"
         },
         {
            "id": "5005",
            "type": "Sugar"
         },
         {
            "id": "5003",
            "type": "Chocolate"
         },
         {
            "id": "5004",
            "type": "Maple"
         }
      ]
   },
   {
      "id": "0003",
      "type": "donut",
      "name": "Old Fashioned",
      "ppu": 0.55,
      "batters": {
         "batter": [
            {
               "id": "1001",
               "type": "Regular"
            },
            {
               "id": "1002",
               "type": "Chocolate"
            }
         ]
      },
      "topping": [
         {
            "id": "5001",
            "type": "None"
         },
         {
            "id": "5002",
            "type": "Glazed"
         },
         {
            "id": "5003",
            "type": "Chocolate"
         },
         {
            "id": "5004",
            "type": "Maple"
         }
      ]
   }
]


 Non-default options:
# settings = {"genpk":false,"drop":true}

*/