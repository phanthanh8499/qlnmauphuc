PGDMP     0    "            	    y         
   qlnmauphuc    13.4    13.4 `    :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    16545 
   qlnmauphuc    DATABASE     n   CREATE DATABASE qlnmauphuc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE qlnmauphuc;
                postgres    false            �            1259    16734    cloth    TABLE       CREATE TABLE public.cloth (
    id integer NOT NULL,
    cloth_material character varying(100),
    cloth_name character varying(100),
    cloth_quantity integer,
    cloth_userid integer,
    cloth_typeid character(4),
    cloth_image character varying(100)
);
    DROP TABLE public.cloth;
       public         heap    postgres    false            �            1259    16732    cloth_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cloth_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.cloth_id_seq;
       public          postgres    false    221            >           0    0    cloth_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cloth_id_seq OWNED BY public.cloth.id;
          public          postgres    false    220            �            1259    16605 
   clothtypes    TABLE     e   CREATE TABLE public.clothtypes (
    id character(4) NOT NULL,
    ct_name character varying(100)
);
    DROP TABLE public.clothtypes;
       public         heap    postgres    false            �            1259    16630    measurements    TABLE     �  CREATE TABLE public.measurements (
    id integer NOT NULL,
    m_userid integer,
    m_neckline integer,
    m_bust integer,
    m_waist integer,
    m_buttock integer,
    m_shoulderwidth integer,
    m_armpitcircumference integer,
    m_biceps integer,
    m_wristaround integer,
    m_sleevelength integer,
    m_shirtlength integer,
    m_crotchlength integer,
    m_thighcircumference integer,
    m_dresslength integer,
    m_pantslength integer,
    m_gender character varying(10)
);
     DROP TABLE public.measurements;
       public         heap    postgres    false            �            1259    16628    measurements_id_seq    SEQUENCE     �   CREATE SEQUENCE public.measurements_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.measurements_id_seq;
       public          postgres    false    208            ?           0    0    measurements_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.measurements_id_seq OWNED BY public.measurements.id;
          public          postgres    false    207            �            1259    16681    order_details    TABLE       CREATE TABLE public.order_details (
    id integer NOT NULL,
    od_orderid character varying(100),
    od_productid integer,
    od_clothid integer,
    od_neckline integer,
    od_bust integer,
    od_waist integer,
    od_buttock integer,
    od_shoulderwidth integer,
    od_armpitcircumference integer,
    od_biceps integer,
    od_wristaround integer,
    od_sleevelength integer,
    od_shirtlength integer,
    od_crotchlength integer,
    od_thighcircumference integer,
    od_dresslength integer,
    od_pantslength integer
);
 !   DROP TABLE public.order_details;
       public         heap    postgres    false            �            1259    16679    order_details_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.order_details_id_seq;
       public          postgres    false    219            @           0    0    order_details_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;
          public          postgres    false    218            �            1259    16669    order_paymentmethod    TABLE     n   CREATE TABLE public.order_paymentmethod (
    id character(3) NOT NULL,
    opm_name character varying(30)
);
 '   DROP TABLE public.order_paymentmethod;
       public         heap    postgres    false            �            1259    16674    order_shippingmethod    TABLE     o   CREATE TABLE public.order_shippingmethod (
    id character(3) NOT NULL,
    osm_name character varying(30)
);
 (   DROP TABLE public.order_shippingmethod;
       public         heap    postgres    false            �            1259    16663    order_status    TABLE     a   CREATE TABLE public.order_status (
    id integer NOT NULL,
    os_name character varying(30)
);
     DROP TABLE public.order_status;
       public         heap    postgres    false            �            1259    16661    order_status_id_seq    SEQUENCE     �   CREATE SEQUENCE public.order_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.order_status_id_seq;
       public          postgres    false    215            A           0    0    order_status_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.order_status_id_seq OWNED BY public.order_status.id;
          public          postgres    false    214            �            1259    16655    orders    TABLE     ^  CREATE TABLE public.orders (
    id character varying(100) NOT NULL,
    order_customername character varying(100),
    order_customeraddress character varying(100),
    order_customerphone character varying(11),
    order_customeremail character varying(50),
    order_startdate timestamp without time zone,
    order_enddate timestamp without time zone,
    order_subtotal integer,
    order_discount integer,
    order_total integer,
    order_paymentid character(3),
    order_shippingid character(3),
    order_statusid integer,
    order_userid integer,
    order_tailorid integer,
    order_processingtime1 timestamp without time zone,
    order_processingtime2 timestamp without time zone,
    order_processingtime3 timestamp without time zone,
    order_processingtime4 timestamp without time zone,
    order_shippingtime timestamp without time zone
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    16572    products    TABLE     �  CREATE TABLE public.products (
    id integer NOT NULL,
    product_code character varying(100),
    product_typeid character(3),
    product_name character varying(100),
    product_price integer,
    product_old_price integer,
    product_color character varying(50),
    product_material character varying(100),
    product_lining character varying(50),
    product_size character varying(50),
    product_thickness character varying(20),
    product_softness character varying(20),
    product_elasticity character varying(20),
    product_introduction1 character varying(150),
    product_introduction2 character varying(150),
    product_introduction3 character varying(150),
    product_introduction4 character varying(150),
    product_introduction5 character varying(150),
    product_sizeimage character varying(100),
    product_image1 character varying(100),
    product_image2 character varying(100),
    product_image3 character varying(100)
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    16570    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    204            B           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    203            �            1259    16565    producttypes    TABLE     g   CREATE TABLE public.producttypes (
    id character(3) NOT NULL,
    pt_name character varying(100)
);
     DROP TABLE public.producttypes;
       public         heap    postgres    false            �            1259    16600    test    TABLE     �   CREATE TABLE public.test (
    t_material character varying(100) NOT NULL,
    t_code character(5) NOT NULL,
    t_name character varying(50)
);
    DROP TABLE public.test;
       public         heap    postgres    false            �            1259    16643    test2    TABLE     g   CREATE TABLE public.test2 (
    id integer NOT NULL,
    t1 integer,
    t2 integer,
    t4 integer
);
    DROP TABLE public.test2;
       public         heap    postgres    false            �            1259    16641    test2_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.test2_id_seq;
       public          postgres    false    210            C           0    0    test2_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test2_id_seq OWNED BY public.test2.id;
          public          postgres    false    209            �            1259    16649    test3    TABLE     �   CREATE TABLE public.test3 (
    id integer NOT NULL,
    date1 timestamp without time zone,
    date2 timestamp without time zone
);
    DROP TABLE public.test3;
       public         heap    postgres    false            �            1259    16647    test3_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test3_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.test3_id_seq;
       public          postgres    false    212            D           0    0    test3_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test3_id_seq OWNED BY public.test3.id;
          public          postgres    false    211            �            1259    16777 
   user_types    TABLE     d   CREATE TABLE public.user_types (
    id character(2) NOT NULL,
    ut_name character varying(30)
);
    DROP TABLE public.user_types;
       public         heap    postgres    false            �            1259    16556    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    user_typeid character(2),
    user_username character varying(30),
    user_password character varying(100),
    user_firstname character varying(30),
    user_lastname character varying(30),
    user_address character varying(100),
    user_city character varying(30),
    user_tel character varying(11),
    user_status character varying(10),
    user_date timestamp without time zone,
    user_avatar character varying(100),
    user_email character varying(100)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16554    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    201            E           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            q           2604    16737    cloth id    DEFAULT     d   ALTER TABLE ONLY public.cloth ALTER COLUMN id SET DEFAULT nextval('public.cloth_id_seq'::regclass);
 7   ALTER TABLE public.cloth ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            l           2604    16633    measurements id    DEFAULT     r   ALTER TABLE ONLY public.measurements ALTER COLUMN id SET DEFAULT nextval('public.measurements_id_seq'::regclass);
 >   ALTER TABLE public.measurements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    208    208            p           2604    16684    order_details id    DEFAULT     t   ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);
 ?   ALTER TABLE public.order_details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            o           2604    16666    order_status id    DEFAULT     r   ALTER TABLE ONLY public.order_status ALTER COLUMN id SET DEFAULT nextval('public.order_status_id_seq'::regclass);
 >   ALTER TABLE public.order_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            k           2604    16575    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            m           2604    16646    test2 id    DEFAULT     d   ALTER TABLE ONLY public.test2 ALTER COLUMN id SET DEFAULT nextval('public.test2_id_seq'::regclass);
 7   ALTER TABLE public.test2 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            n           2604    16652    test3 id    DEFAULT     d   ALTER TABLE ONLY public.test3 ALTER COLUMN id SET DEFAULT nextval('public.test3_id_seq'::regclass);
 7   ALTER TABLE public.test3 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            j           2604    16559    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            6          0    16734    cloth 
   TABLE DATA           x   COPY public.cloth (id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image) FROM stdin;
    public          postgres    false    221   ny       '          0    16605 
   clothtypes 
   TABLE DATA           1   COPY public.clothtypes (id, ct_name) FROM stdin;
    public          postgres    false    206   ;}       )          0    16630    measurements 
   TABLE DATA           
  COPY public.measurements (id, m_userid, m_neckline, m_bust, m_waist, m_buttock, m_shoulderwidth, m_armpitcircumference, m_biceps, m_wristaround, m_sleevelength, m_shirtlength, m_crotchlength, m_thighcircumference, m_dresslength, m_pantslength, m_gender) FROM stdin;
    public          postgres    false    208   �}       4          0    16681    order_details 
   TABLE DATA           +  COPY public.order_details (id, od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength) FROM stdin;
    public          postgres    false    219   �~       1          0    16669    order_paymentmethod 
   TABLE DATA           ;   COPY public.order_paymentmethod (id, opm_name) FROM stdin;
    public          postgres    false    216   ք       2          0    16674    order_shippingmethod 
   TABLE DATA           <   COPY public.order_shippingmethod (id, osm_name) FROM stdin;
    public          postgres    false    217   2�       0          0    16663    order_status 
   TABLE DATA           3   COPY public.order_status (id, os_name) FROM stdin;
    public          postgres    false    215   }�       .          0    16655    orders 
   TABLE DATA           �  COPY public.orders (id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid, order_processingtime1, order_processingtime2, order_processingtime3, order_processingtime4, order_shippingtime) FROM stdin;
    public          postgres    false    213   �       %          0    16572    products 
   TABLE DATA           �  COPY public.products (id, product_code, product_typeid, product_name, product_price, product_old_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3) FROM stdin;
    public          postgres    false    204   �       #          0    16565    producttypes 
   TABLE DATA           3   COPY public.producttypes (id, pt_name) FROM stdin;
    public          postgres    false    202   ��       &          0    16600    test 
   TABLE DATA           :   COPY public.test (t_material, t_code, t_name) FROM stdin;
    public          postgres    false    205    �       +          0    16643    test2 
   TABLE DATA           /   COPY public.test2 (id, t1, t2, t4) FROM stdin;
    public          postgres    false    210   k�       -          0    16649    test3 
   TABLE DATA           1   COPY public.test3 (id, date1, date2) FROM stdin;
    public          postgres    false    212   ��       7          0    16777 
   user_types 
   TABLE DATA           1   COPY public.user_types (id, ut_name) FROM stdin;
    public          postgres    false    222   �       "          0    16556    users 
   TABLE DATA           �   COPY public.users (id, user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_city, user_tel, user_status, user_date, user_avatar, user_email) FROM stdin;
    public          postgres    false    201   3�       F           0    0    cloth_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cloth_id_seq', 1, false);
          public          postgres    false    220            G           0    0    measurements_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.measurements_id_seq', 19, true);
          public          postgres    false    207            H           0    0    order_details_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.order_details_id_seq', 53, true);
          public          postgres    false    218            I           0    0    order_status_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_status_id_seq', 9, true);
          public          postgres    false    214            J           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 14, true);
          public          postgres    false    203            K           0    0    test2_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test2_id_seq', 7, true);
          public          postgres    false    209            L           0    0    test3_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test3_id_seq', 3, true);
          public          postgres    false    211            M           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 13, true);
          public          postgres    false    200            �           2606    16739    cloth cloth_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT cloth_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT cloth_pkey;
       public            postgres    false    221            {           2606    16609    clothtypes clothtypes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.clothtypes
    ADD CONSTRAINT clothtypes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.clothtypes DROP CONSTRAINT clothtypes_pkey;
       public            postgres    false    206            }           2606    16635    measurements measurements_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT measurements_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.measurements DROP CONSTRAINT measurements_pkey;
       public            postgres    false    208            �           2606    16686     order_details order_details_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_pkey;
       public            postgres    false    219            �           2606    16673 ,   order_paymentmethod order_paymentmethod_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.order_paymentmethod
    ADD CONSTRAINT order_paymentmethod_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.order_paymentmethod DROP CONSTRAINT order_paymentmethod_pkey;
       public            postgres    false    216            �           2606    16678 .   order_shippingmethod order_shippingmethod_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.order_shippingmethod
    ADD CONSTRAINT order_shippingmethod_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.order_shippingmethod DROP CONSTRAINT order_shippingmethod_pkey;
       public            postgres    false    217            �           2606    16668    order_status order_status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.order_status DROP CONSTRAINT order_status_pkey;
       public            postgres    false    215            �           2606    16659    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    213            w           2606    16580    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    204            u           2606    16569    producttypes producttypes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.producttypes
    ADD CONSTRAINT producttypes_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.producttypes DROP CONSTRAINT producttypes_pkey;
       public            postgres    false    202                       2606    16766    test2 test2_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test2
    ADD CONSTRAINT test2_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test2 DROP CONSTRAINT test2_pkey;
       public            postgres    false    210            �           2606    16654    test3 test3_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test3
    ADD CONSTRAINT test3_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test3 DROP CONSTRAINT test3_pkey;
       public            postgres    false    212            y           2606    16604    test test_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (t_material, t_code);
 8   ALTER TABLE ONLY public.test DROP CONSTRAINT test_pkey;
       public            postgres    false    205    205            �           2606    16781    user_types user_types_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_types DROP CONSTRAINT user_types_pkey;
       public            postgres    false    222            s           2606    16564    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            �           2606    16750    order_details FK_CLOTH    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_CLOTH" FOREIGN KEY (od_clothid) REFERENCES public.cloth(id) NOT VALID;
 B   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_CLOTH";
       public          postgres    false    221    2957    219            �           2606    16740    cloth FK_CLOTHTYPES    FK CONSTRAINT     ~   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_CLOTHTYPES" FOREIGN KEY (cloth_typeid) REFERENCES public.clothtypes(id);
 ?   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_CLOTHTYPES";
       public          postgres    false    206    221    2939            �           2606    16727    order_details FK_ORDERS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_ORDERS" FOREIGN KEY (od_orderid) REFERENCES public.orders(id) NOT VALID;
 C   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_ORDERS";
       public          postgres    false    2947    219    213            �           2606    16755    orders FK_ORDERSTATUS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_ORDERSTATUS" FOREIGN KEY (order_statusid) REFERENCES public.order_status(id) NOT VALID;
 A   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_ORDERSTATUS";
       public          postgres    false    215    2949    213            �           2606    16687    orders FK_PAYMENTMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_PAYMENTMETHOD" FOREIGN KEY (order_paymentid) REFERENCES public.order_paymentmethod(id) NOT VALID;
 C   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_PAYMENTMETHOD";
       public          postgres    false    216    213    2951            �           2606    16722    order_details FK_PRODUCTS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_PRODUCTS" FOREIGN KEY (od_productid) REFERENCES public.products(id) NOT VALID;
 E   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_PRODUCTS";
       public          postgres    false    204    2935    219            �           2606    16595    products FK_PRODUCTTYPES    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_PRODUCTTYPES" FOREIGN KEY (product_typeid) REFERENCES public.producttypes(id) NOT VALID;
 D   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_PRODUCTTYPES";
       public          postgres    false    204    2933    202            �           2606    16692    orders FK_SHIPPINGMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_SHIPPINGMETHOD" FOREIGN KEY (order_shippingid) REFERENCES public.order_shippingmethod(id) NOT VALID;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_SHIPPINGMETHOD";
       public          postgres    false    217    2953    213            �           2606    16760    orders FK_TAILORS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_TAILORS" FOREIGN KEY (order_tailorid) REFERENCES public.users(id) NOT VALID;
 =   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_TAILORS";
       public          postgres    false    201    213    2931            �           2606    16697    orders FK_USERS    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (order_userid) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_USERS";
       public          postgres    false    2931    201    213            �           2606    16745    cloth FK_USERS    FK CONSTRAINT     t   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (cloth_userid) REFERENCES public.users(id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_USERS";
       public          postgres    false    2931    201    221            �           2606    16782    users FK_USERTYPES    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_USERTYPES" FOREIGN KEY (user_typeid) REFERENCES public.user_types(id) NOT VALID;
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_USERTYPES";
       public          postgres    false    222    201    2959            �           2606    16767 
   test2 FK_a    FK CONSTRAINT     p   ALTER TABLE ONLY public.test2
    ADD CONSTRAINT "FK_a" FOREIGN KEY (t2) REFERENCES public.test3(id) NOT VALID;
 6   ALTER TABLE ONLY public.test2 DROP CONSTRAINT "FK_a";
       public          postgres    false    210    2945    212            �           2606    16772 
   test2 FK_b    FK CONSTRAINT     p   ALTER TABLE ONLY public.test2
    ADD CONSTRAINT "FK_b" FOREIGN KEY (t4) REFERENCES public.test3(id) NOT VALID;
 6   ALTER TABLE ONLY public.test2 DROP CONSTRAINT "FK_b";
       public          postgres    false    2945    210    212            �           2606    16636    measurements FK_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT "FK_users" FOREIGN KEY (m_userid) REFERENCES public.users(id) NOT VALID;
 A   ALTER TABLE ONLY public.measurements DROP CONSTRAINT "FK_users";
       public          postgres    false    208    2931    201            6   �  x��W�n�@]㯘M�V��� �ǻ*�H�����A6246D<��#���4�J}�]�{�U��?��06cq�M�L��{�9s�C=����#;8�q�n8�C������+e�.�\0�L�tq��,���۞�UA�ɓ��J��ά��N�~���Yoh��?
�>��!�m���r��+H-s(CEA�M��&�<p������E(�)蹶ǐf�6�'7�$G>;����*(s˛��~v�fG�RGqm��"],A�.ߎDCs�ӗ������wa���
LC17G��_G~�^�P�����4������1�^�|�?���]\[��bdE���}�~,(�C(E��Z1*
���9�A�3�o��h�8d���˯.�&��5�*F�a�� ��+��)Ó�J��Y�{��CD�UL��GĀ�G砞��ް+�#}�s�cP�ޚ�,��3/��Ι����̊'#$����>�����g/*�g>� �.l��a��7/
�x���]�:��}��p��IW߀Gf���'�so��wT(#��L����O��3ZM���oyL��uƦ|'pn�q�3��6f���yp�2`o�E(�%ɸ]e}��X��E#����-�T�H�-�7�R�*m���jG����t��(֔�r����>�6��"�\�Zm�6�g+�ju�+8�����KW�5����b4q��_�ge�B�H�݉���qc�J�������ږH&�ù���
�$��)��#r�����W��[���U���t߂�kG�q�j�0�ne�i��6�S6V��r�Ɇi}`��f�O�I��Ys�Jr��Ϋ��f��y15��K婨�Ȇ`��`���+N����n13j`ME��i�>�$ś"]oA���IIFH�3k�r1Ƶ͑�:�����(�<('"�gs�C��L)���~��t:��7�      '   r   x�sv��{�kq�BrbQ>WX���_��S�Z\�Z�������k�BI��]�K2���P�x��7�+���&;���d���y�
�w���
��Y��p�n�b��=... �7�      )   �   x�uRA� <��t�H[��K���� `�$��+��)�Z�V�*�%�1����T�^��bE���R�݇/H	4�8�wE��=�YO��*��L$*�i��ꓒ�.����.\���>5J�b{&�)���?��tF�cg�C\i$�'���>�+���_�O���!��g������/U����4i�6`|�=��W&p_�C�޴'-:L�!�c�i��8m�>��jd�
��K#���q^�1��,�5��      4   �  x��X[�$9�v�E[�,�.�������;��A�";Q��`(d����]��2�ڔ�f�^{�8�g�n�W*��"9��?��YRƣ������<����|�6*;w�c���������O���jZKgW=����L!�K+GϨ��G�-�)��:�L�{��3�j�,3��4�#XK�F��Bs0��4��Q��V,�+*��������������lO��.�
��B(Ϩk�����?��$'x/��x���`��Ǯ��\�G���}�r��|�K��}h�/{Y����?���7n�~��[R���@3�v�0i�R��v�ڏ9V8��5
m�6�a�L|��5_Y�>cC��k�[W�,�$��|,��k����[m�|� ��MwaSap�Q:��\��i�����~w��ϑ���W�Ĭ����7IU%o��Z5ZA�r��lo嶴��¹�Z\H\�\e�	Μw��4�{�~u�A��Uj��9�y-|^��0�\��N#f�q,kݥq�?h`	��eɡ��32��o��q��`j�%�g�v����CŠ0|�*.q�F�M����炧��*��i��퀺g�n5V����ό�sjk����+��wp�+�Y-Pm���/������S:���;����Q�FC�g��>i�̸|���v���K|����j�ˏE����_�}&�m�h%�|�Qgj��:�nm8�aÜ݇�������+\,�`e-�9����aѲ/L(�?���JD%���{/�r��F��M�z�c���^��<ym��~�A=KE;��#�E�g�*1���`�@-���h�E�o�{��+�=��+��S��˗�砧�,��BʆC18rA?���qPa�cN�Q
��A�0�&�����Y&:��m��gb<# �F66cL��:��~-8�Qk3#�6@V4e"��o�2�!(����F�AH��� H�f!���AUPP��"뵊),S�S1�+w��6��P�����HQ!&a�&��{�=��z�	�ZϰZ�0����1��LG���-�-�nȄ��Q����|9\}>�4��7B�98���6������xx��Vr�!$�q�%�:ju��.�5�!��U1͖l���U��9;ƻ{��P�|�T�o�u�uh�'�$E���t�\�?���d�z��������¥�\y���WO?Ϯ7PN�T;�����>����6���WO?�7К6���P�{PP%@1X��+�`o{&S���sn<�A��:&^槢I��d��	�:fF1V����1>mw�6�WQr�?}��6EO�<��g&-PԌ�����z\e�d�������������כ�ma���F��l`El!����k�@=a=b��)㬡��ww���H���?�G���ƌ ���gT��0����.}�8x�G��9�jB�w�۵#N��g��0@��Mb�#�J�z�3F`U�0?�#?�kG�Y�{]T��%jp�y�������?___�B�i�      1   L   x�s�w��H��P(�?�0O!;#S!=31_!����tgM.�p_E�y9�y�
���
e��*����s��qqq F��      2   ;   x������x�km�B��y�
%w-�T�rr+��C�8�3�A�@5 q�=... �L�      0      x�3�<2!1/]��ć�g*T<ܽV!��^.C�8X�$H)�&Vr �/V�(}�{;�Tc��]K+��Z��e�6�(2*��ҹL�r@�k��3J+�n��2���?� O�hL	W� s@@I      .   �  x��ZK��]��b��3"#23zeA��EyAHm�+��K/���w������8���S��!�e9�i<���ˌx�^V�X��2)'�����]cv�]ڼ������������o�_<l<����S���^f���������/����/_���$ʨ��y�M~������_�����6�8�G��
1\`�濍;�����l^��j�n�7��������ڍUU�)+h)HFI����Ω}2fxOn�Ӗ��]b����s��?�����o_�0j���Z����|St�3��\�m�����GKCkZ��ߒ���aAu��o_̝�Lɘ�9ӓ��1q;R�1{�P2%� r���1�����Խ�OL��ѽ�o߷_�Rx�"
Ɂ�x�B����U��+�m1���C�/{v�zW�e[��H8_��k��o+r��֝b��7m�['ihh%CԠ�ȥ�X=�Ֆ�O}#��c��9h��h�Uɫ�mÕ����sMF� �����<���hժ[�˽?b�s�Wjr��Hgי�7���K�_y_<bw�*b���8�H��&3l5��6x�'���꣖JQ�C������kE�"[yl\`�g�c�e8a��Ձk�F�J)	L���p덂����g�ǞT�X�u��9��m]�00��R��u�N|(mY��m����Ĉ��}A��{���#e��d�Sm۝`N&�{Ҏ�w�I�����R@se�z�T̖�\�q��Z��Ή��ubA�H�9�iG��ġͳe=��S����i�0	b��;V�Ժ����ւ2,x�=������ѝh�{Ҏ����ծ�j�T8CѴ�L+�x�=�ŵ܂��d�����!�ދR�k�ߏ��S\Wo�t �hƒ�����z�1�n�6��LSݗ)n�]r{g=�*6��[Vq}3�ц��F�K�~�a�[wP�صa6�����4rv��U�O1��r��D���}0���䓇ѻL��z��
Zv�N'E~��e�Y�s�N�����U���O1��#vgbָr, r�	�1CId� ��z������$.�C
t�WGI8=�Н)�[��>�$�)_dg(�nA/��}]��^L���D�'��]s���8�=�
��1@�.�:�|��p.�����b��]LbZ`OXf��w�6~��t���g�ĵ�,��5�hf�L���N�<���C
��Y3��6�Ԇ�9&��{�
Kw�J�Y+e�d�	\qޢr7���6>�����,�7�'�u�t^�B~Ԡe�x����SW���}�����:ǜ�2�1�s,\y�M�0�(��5�2[�a��扉�;FJ/��\#ol;�kt��?��-Eͫ��vb���ɦ��B�b#��u�O>+�=���1��'y/;� G�U�Ah��ɼ��m#���te��%����1�&E�#�`�x-�(ɢ�ju���q��*-1��ë��[�:���+�#:����}��dƮ�O�������ިM?`��T<Q2Z`�V��7W��3��n	l�0A�b��}UZ�_����ZZb��ۿp�:��'f\��eP�#�-
N렋��)��ğ�B'}z�>B����Z�9?z6�����ɻ�M��E����-T����tv�-YU̐�5��Kf(�V�T�F��/�EVIyh<�9��K� ��ɹDuĕ����{��c�����Z.a�,d5���[Hd"�,�ۑb��̛?V�6��u���UΫ[���egV�`33hr�}����J1�vf�����(g��a�C#�����liKX�Y�)7eS�>oG#6J�n���i}��$����� ��8��}�b^tm͗�'-��k>ʐAY`�>O1L�-H����"qmi�!;-��,�G�|�b�$�d�?F�n���[��98�0���d���8g��V~�}uCvŷ̭YF�}�Y�L!娪6�^��{>�2:of���y��m�e?$˹R�yw�L�'f�GE����nTnf��nɍmjC))AVuR�f{Y��nȮ�yh��L;�EL3}��c�܆u��#7χ]L1��"D���77���R]�h�2��w7d���cLJ
����`*jA�h9�����.HK����<���'م�/�^w�+�˛��a�
�Z�f5vY�ͧS����|ؙ�,}$�TJ���<$g��gQ�����t�O#⩁>`O�g+mt����?d�2��t꽔����fľ������n      %   �  x��Z[���~�_�9r��ɽ$�nn@�W�(EKm�yK�"(� 1�>FP+F�l�Es1�.�<����?�93�Dr����.s9sx��|���Ƶ߱�$x���A��$��۰��PW���`y������>|�ՙ��g����:����|-x��-z��j1�WY�N'�G����^�����@Ol/$/�SY{; Qs\�j/��_��[���՗�P/�>��cy�C;���N����d���p��\�!�:�-��a�<�&,���K0s�<0���矌�r&��^�_��L�jyvR���)�L���}�ǣ~�
�8�_U�2,�nc��<[���c�#|[.�N�չ�N*�}�/{Cx�<�^��_����p�}w^;���h�α<�8\���(w�L>�k�v~�^h����a�2<�����,`��a?^Ώ�ٺ���4��iN~�N����A���OF�=X�x�:���C�:��}��'}�5�W�����އPס��� �l��bX��G�����X�ڃ��W}h^U�ۃ��vc�?-v����ۡ�(�6�$17<�D*m.#c���8�d>d����b�扰���"��<�*1��O���J��q�L���6���\�F)7�
~}�l�?�Q����v�p7�#4|��7x�?� ���:���]��6�xk�����+C䆮�����
1�>��y1�
��3�r�\R��أ1>�֡x:�@�����Ϗp	��	�P}Z�� \�S�?X�X�?G��˷���}�r����ax8w���p{a��|��ayc�7���x�=�	��{�rooW��P�Y���:	��l�@D�a��o��{��=u(�hQ8?(6��rՇ�m04��l`-�ӄ��b2W���,ɸ��d���d��I��N6 *�6ϴ�VqÌ�66)QLHK�m,t��!l@�6�L�d	W��<34���9K�����^~�F
Z��34��������!<� ���:��>�&���IYN��oj�O�ק�C;���M�����4L{����qi�A7=:���u}�.���Rn��bAl�a���d�A�H�p��m����桃
�a���N|�<�������C�� zt N���s�]
9���d���>k�]���9��N\�meg�;��+\Ҏ�,���ǹ��0x�&��t���f=����A��r�Q�I��Ie��8�<MKI�M��;$d��$����S�+�56�s��^�3���β�BV�wt[��R��%�+$����b�1�Y��Â8�j���B��Bh�8r�ud�$�s�D{���o���\,Ͻ���MzH�������g�D�#x�_�7��!�)X�V-�|�������p���eJ��۩� �Yliӿ���)��ا�y����=(�m����2,p�O3���>���¥.�ڊP��A ���j�Fp���'����ӰP0�N%��a7��X�$������N<0ylE�E�L	ϤH3#T$	I��D�%wlf�f�RUNs�q.�@�bLI�S]6[�<�-�_�pXIe	3�咧&}���W��2}6�WQ���^5h9�4�M �:�&
|_ u��'.q�RG�]/Q9�g�f?� �rǩ!���7u��.BNX������4� �Ԑ����F�����Sd(��@aI�Od���O���(�Q��:E���:Ug9��.�#ׇ�%���K��6<:�Q�.tfS��Nb&s��-�j�ƴ!�"Jʔ�<�R�,�1BQF�S�K���-���P�\������c�#.���F,�ЊN�O�d�[�&�8�g���E�ԡ��(���3�����-�[��J�A:A(c���id�͘%/�VAB�7a���(�?-��2�NA��'���U ���i�����Wzଟ���f��r�}"��*]�P�ݤ�Uݺ��w�[��!ɭ����I<�~��Y+J���<NuF3�b�J����%ڷ��Z��ZOj�e\%:aP8�����T,�j�m��f�nk��� �LęN�L-�TY��~VU�QU�<گ�l�)�rS�p�l���Q�����6	￰����d\������L��f�I��{��u	U��.e�F7q3Wx�9F�M���{.��ȿ#�ٿ���^��[Ut�{�oYS�/��1yy%U��w�[k)�b(���{������Đ�tj����3as��Nt��K��l�XPo*a�? \h�T"K0�!%�S��Ud��HN�J*(�l%y)�')�Rn�H��lӆ�8�F)B������@�
}T��|&��R��.�źA�������#TB�i�ظ7j\�G��N� �B�Mk�W�='�'ި~{W�Iq�N��j�׸��e��`D�[)��S�Vd�6�.�5�����ԫB�Z�ͩ��2�N�c�§����[=vL��
`�&�o�����ç]���k����Y�cE�4��p
u� ��������n�ՙ�)K�4a�U���KIeS�Zb�Fv�t@� �IB35��F�B��el��h���'^���8nvBJ��*���Qx<��hݍX�_P�:�X�"��~Ґ�I�g�O'^�����l+?_$��R	��hX}�����QM�{��%�tu��Ė�ԧn��#��k���ড-G��]�5���N��"@���E8�^��Ӎ}!֋wP�7Hh�ϝ>�*�r�-P������ Ma�媗y+$�J��������{�c��|��d�:@�8hRᦉ��wp4��]/�mAE|.ћ�?ڮ�W�W2��pVO�qE}��\��O�qol�zr�X�+�o��ֽ~#G��z0m��`>���q��D�6�	M� )�R��R�(i̩mc��@:H��h,�Q���<��Uӊ�1�|>�4��Bbϕa<�V˘�|y;�d���~u+"���uO�NC> ���[�w@Y���QE��zղv��<�s���?]��4�dl�+��7�z��#WFb㾇��'h�<���ힶ�O<��G�1�m̮B��y$m2�Q�q�>tͨC`��S����'���Ae��2���/�+��L�ako]�;u׾��M�ݱ^�����ύ�:2rb��$j�J��}�D��~6�<���V`+��׺��#J0�O��vw�"��WW@�P�w��1���	�<�RS D9�J�,JR�W���.t���"��[-T��M��* 1q���?}�d�m�B��g�O3�pi9՞R8R�h�� [��b��ZԸlɔw��� ��/��Z�!�|27oz�l�2Ӌ̇�w�NU����k�9���=�4�κP�M���'vĦ?[��:�Kmx9�DX۔����D���YW+��ֱ�=*���:sW�����NSɕW�i������Vz�K_��}M��:9j�Y�#Ʈ�|P�� �sz��oW��ċa�b��F7�H����J
��$--���n���-va�wa�磰:���i���N�Oi���Nh �ު�t��9V9sd���"��g���+z2=�P�Ǌ��ĒGi�{
�M�$O5�f+���!���F�2�	Y��!:R,Ms���x�|:P�ؘ�i�WJ�4���eV't���7�W�\�cb
�      #   W   x�sr��t�I�J-RH��W�K��

�f��B�!��)�p!w77N�̜T�����"a��%w�6���nH����qqq !+v      &   [   x�37PU(�ϩL-.I-�Q0r��KJ��8��}8��Z�	VQ�
T���p�B���[����^]�Pqxa.�9^S	�rdbjW� ��8g      +      x�3���4�4�2�4�1~\1z\\\ ,��      -   =   x�3�4202�5��56P04�20�25���\��"jh�,�3B�4E��`Qi�P���� �      7   >   x�st�,}�kq�BI����
e��W�q��q�e^��z{pzg^����qxA^:W� �      "   �  x���;o���kΧ`1吺o^�
�2-ɖDѲ,,0�$���L��ni3��TlR$�V�"��=�MrI[ٖ3�B�����?珥�)]z˭�{���ͺ�9�r+.��B�5Y�ѭ��znuD�8VW=�G�t�+n�*��l�Z2��>��?�r�?�&z�|���� �ř��k���������s(���.%��N��C]r�`�J � ]�D Oxs�S&��`�xn�sV�s�a�� r��$~�w��ܓ.;Nh���9�TD�w��W7:Hn�ʲ6\oѺ��ﴈ6���b�j�y�!XT���w�`	' d�${���h���uHe�'�!�a�<a*��)՘3��+)�2�lQ�;Ux$���n�8��@��wu��WhtV҂d0[46]c;���{V]��mYv��: �\ڒ��~
}��;o~�:�r �s� �籖�J�N��c�5��q¨��#B	$R�'�P�Qu�q@?������������<@��3׉���5�[����aݴ��gz9�\7Weh�[դ[����\���%�w������_~������;	��~5B���>{:��>\F �X��Ԙ�SCL�?��I�"�}COYL�~$��tfy�MɝO�����ٟ{��N�1�>��LZ���($7 (4E]�Hoq��Lj��?�P�w��f����TW�7pС�t�z ���`��y ^��u f(�2p�à<(>6Lg%<J;��]د��s4�wU�`�F#׬���tH���3H�I�kPM��DBH��ϬP���M�@�~
>�
����8��B�tf[@!�N��y���dfbN1���a�Ș�O�CK�1��80�ĖuA��Q�F����A<_FF'���ڸR_V���Wz�b��&d62�_B���E���h��D'���@(����5�h�72
���@��*��:C_�v���7�Wh8�v���˙x�~m8Vm�[c�䓩�lP�����t�MϬ�0ih|:H��L[a����a�����{BDj��L����ղL�XɎ�Dh>�@m� 4o ���I��U���Mn�7�6h�A�6܎�v�T+��=��"7���J��	 Gٙ���?�/�D0 $/���CB�<�UN `��?�j"b��l��8;$�$9�	_�$aPn���^<5ڭI�w�e�h߾1λ�&�q<��P��(�J^pܳBOZ.oh�׺�a��$�P�O1 :��r�8�:�
L�V���Cݢ����.��i�`�B ��c�f$��n��]~]C�rx�����&jy��M���KTT��Y%��c��ZZܚh[-E ����.��3�<�\n%
����i O��?�:,�b�,f�����oy	�bYxٻ�m0�y�T�9R�Q�f��=��o��ѥ9���3��5b+.Gg\5��]iZw[M��{����.ފ��㋅餏z|��%�X�D9����3���S߽{���     