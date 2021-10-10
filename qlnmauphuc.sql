PGDMP     :            
    	    y         
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
    public          postgres    false    206   ||       )          0    16630    measurements 
   TABLE DATA           
  COPY public.measurements (id, m_userid, m_neckline, m_bust, m_waist, m_buttock, m_shoulderwidth, m_armpitcircumference, m_biceps, m_wristaround, m_sleevelength, m_shirtlength, m_crotchlength, m_thighcircumference, m_dresslength, m_pantslength, m_gender) FROM stdin;
    public          postgres    false    208   �|       4          0    16681    order_details 
   TABLE DATA           +  COPY public.order_details (id, od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength) FROM stdin;
    public          postgres    false    219   �}       1          0    16669    order_paymentmethod 
   TABLE DATA           ;   COPY public.order_paymentmethod (id, opm_name) FROM stdin;
    public          postgres    false    216   ��       2          0    16674    order_shippingmethod 
   TABLE DATA           <   COPY public.order_shippingmethod (id, osm_name) FROM stdin;
    public          postgres    false    217   �       0          0    16663    order_status 
   TABLE DATA           3   COPY public.order_status (id, os_name) FROM stdin;
    public          postgres    false    215   -�       .          0    16655    orders 
   TABLE DATA           �  COPY public.orders (id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid, order_processingtime1, order_processingtime2, order_processingtime3, order_processingtime4, order_shippingtime) FROM stdin;
    public          postgres    false    213   ��       %          0    16572    products 
   TABLE DATA           �  COPY public.products (id, product_code, product_typeid, product_name, product_price, product_old_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3) FROM stdin;
    public          postgres    false    204   ˆ       #          0    16565    producttypes 
   TABLE DATA           3   COPY public.producttypes (id, pt_name) FROM stdin;
    public          postgres    false    202   �       &          0    16600    test 
   TABLE DATA           :   COPY public.test (t_material, t_code, t_name) FROM stdin;
    public          postgres    false    205   i�       +          0    16643    test2 
   TABLE DATA           /   COPY public.test2 (id, t1, t2, t4) FROM stdin;
    public          postgres    false    210   Ԕ       -          0    16649    test3 
   TABLE DATA           1   COPY public.test3 (id, date1, date2) FROM stdin;
    public          postgres    false    212   �       7          0    16777 
   user_types 
   TABLE DATA           1   COPY public.user_types (id, ut_name) FROM stdin;
    public          postgres    false    222   N�       "          0    16556    users 
   TABLE DATA           �   COPY public.users (id, user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_city, user_tel, user_status, user_date, user_avatar, user_email) FROM stdin;
    public          postgres    false    201   ��       F           0    0    cloth_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cloth_id_seq', 1, false);
          public          postgres    false    220            G           0    0    measurements_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.measurements_id_seq', 15, true);
          public          postgres    false    207            H           0    0    order_details_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.order_details_id_seq', 21, true);
          public          postgres    false    218            I           0    0    order_status_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_status_id_seq', 9, true);
          public          postgres    false    214            J           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 13, true);
          public          postgres    false    203            K           0    0    test2_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test2_id_seq', 7, true);
          public          postgres    false    209            L           0    0    test3_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test3_id_seq', 3, true);
          public          postgres    false    211            M           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 10, true);
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
       public          postgres    false    208    2931    201            6   �  x��Vˎ�0]���f�V�؄0YVlF�JS����(X$�Qh�U�?���ڑ�E��E�����&			$)��sν��c0������� ��94�gp��9���ͦ�L�����pΓ��	�����0?{y����g4��<t�r�?�=$��9��є2��rֻ X/r(B�~�f�y�o�����Q$��v!�Q&�
�j	����,C���~��"�*(+���E?5���Q��D��=�I�$��jh~���r\��o(
��z�0�`T�@|uxr�"������?D�N����%�����=�<D�uOm1AQ�Ehʑ�HQ0O��T��wb�T�6*��H��|+,l�Ò��V�������<�+�|Z�Qn��j��vLj
����ի��䚂O5'�s�arx����y��7v=�����K۹'�Ԍ<if�x�q�]lGt��嫎�·���Z(�8!�x;%1$�w�1Y2S6��,��`į��DXp�F2:��Vp��,F�$eg�>W�0������HBW��8����mz4D�'��N�]r�\r~��P�� L�W�G˵������d}��{����n]�j��k��C��9[��)�Ҵ��ݫ6���7�
ҡ�QM���]*�-JWβ�UQn�Ac�7TؤV�:�-�!mk��fX�U�6����1o-%y�C�N�Td9p�N�D�)��N�Z"2@�=cKD�J$��\�wL*�n���J�z�f�[������]K      '   r   x�sv��{�kq�BrbQ>WX���_��S�Z\�Z�������k�BI��]�K2���P�x��7�+���&;���d���y�
�w���
��Y��p�n�b��=... �7�      )   �   x�uRA!<�cAI�_z�a{j�-��iCg�m� k$d�4�vu�H�����>
*U�ء������l�a�R�+I���p|�W�R�c
ܡ��&�F\�7��R��C�3��lAIpi��sZ��a���)��s>��LE&�ñ�D�n,��E�lt���-�7z�y��f�������o��O�nMګ]8������x�k>n��/��v(      4   �  x���[��0D���� )>Ľ�G��/�trS��H�`G�G�pR˪JDcC�� >Zm��<5�6�ZH����J��
� |�G��}�G~:�TZ�@�/hsLH�c�-��EJ�%�eNG�Bo�/ـ�`8�����^S6n�ZC�@�����=��A��x���%�{�q�`t�"�b��u�q��B�i
?�ו�u����޲�4�ET��@�shZ�uZ=�����lه��i3I���	����Y����{}�M�--	�K�]V��xZ������������[�ʉ�-Rͥ�À�hA�D˷�:�mƈˎ*M��u���4LC����b�J��G����i�rt@�)�s�R�v�y������KT
�.b>yL��X:��R$T��~�V�WU���G��냴0�|��k�TUs��ܵ&,t����ZY&��d	e��xf\����e+��,�j	��,F�U0#�{��ϋˌ��g���"�A?��oG����`�%�)�2g�{�X"0�ndj�ټ��[��d�]�g.x�-vx�#h�O��]�o�<V9�Q����=aY=�b���+�/c��=$B$�NϫI2��ɂ�O�-���k�����TL�e�P���Cݲ���:i����7����k�k�W]�?<�_R^$      1   L   x�s�w��H��P(�?�0O!;#S!=31_!����tgM.�p_E�y9�y�
���
e��*����s��qqq F��      2   ;   x������x�km�B��y�
%w-�T�rr+��C�8�3�A�@5 q�=... �L�      0      x�3�<2!1/]��ć�g*T<ܽV!��^.C�8X�$H)�&Vr �/V�(}�{;�Tc��]K+��Z��e�6�(2*��ҹL�r@�k��3J+�n��2���?� O�hL	W� s@@I      .   �  x��XˎU]�_�H�[u��WDAb����&���D"fA�`� [��O��Ǟ�+d"�3���]�S�SU7�B�!QD� ��	�E�Lg�6W/�����o���~���7���`7ǿ}��VL��y���/o��������߿o�D�1n�����/_�N�~xX~|�!Ch���Ah>c8�Č?s:<~����Փ����������֩4eU\`Jb�Hz�Z�R��>3ܑlh�l���#���M8�=�����gWJm�7��7����TD��Rd�l4�b;�ڃ�5�X��|�@��{�\��H��H�LI��%ә�#&f��ԓO6vAȉ�)$�M��{���ԭ����~�hg��sG_�̽d���h�'��2X��hV�qe_Ѐ~�����l�Y�e�������Ѿzd��`���Oubm$��؀{N�:Uh�S���m5�Q�H��p�`"'͓��]���<�(��\���y#��#�+�5[�`�4�g�$y�|:Q�eܑvF�*��x�����gl�� 6
�-;d���k��w�i���ן䪈"�͛�ӛK��C�An�'���p�|7��II��Ԡ���9� *������Z�1f0v��G�^	�9���V�B�|���Cw!TGq��=����B܎�?�A�H���؊@tހw�S���z���q�`��&ؽ"F��*ũǨZ+b*MA����%+��p��GlI�4]&�"Q�yIg��ڑ0 U1��,{YOk��}��m^c'L܉����eM�f�A��Ĵ� w����t������̴q��+b�qC2JQK�]NкW�$�����5���T������&e4΂sȭ�H��9�~bۿ�ŵhu+��k��$g�3@-y�],f�2ӮL��O��	v����vLVw��f��צݹ:lҒ]����,�#v�����lV��6���X������3��VQ��d��j>6X�i��9��H4��t�%�	���)>zk�	i�ߵ�Gq������?c[�ʅ� ' Vfȁt?@�ɶ��~/�}�m�����,	�x���4�����������2�l�E�7�lY��QT��R"ؽ��n����8��Mg�V�:ۋ��'�־�������8f��t^9c�K�]xNǍ>r%���Cd�i��C��bzt���i��G��1S�1�������;�A���'1�i%g3�^�C�����vb�)fO�N�����h�.bz�]x�n�}���v��l,      %   '  x��Z]o�}^��}�E�����<:I� �S�17@�׊��%+���7�(� ��C`5c����D~X�������,�]���ĮaP"9w��s�w�W.��n��[�.�A��۳a!��.�;��|��0��=x��c�Ώg��:H����|n�Vx����U݀G����ޡ=��VH���w�����,����>.x�^n������:��S��8����a_�����w;���|��l�^���S݅Y�°�|v�G������o���|vk�g_��Ѿ,vZ�^y�0�����< :,����i�﵃wpű����������{��iͽ�?�����^��F�A	���e��̏����`����+g��B��9�/����>�Ψ�g��Y`M��/�
�|�w�����l��*�������Й�j9@�[p�٭_?n�A�k�� #���=X�� ��p�
'�ux=�L��,��p���0����Cw��An�ʯE�]�l��^_�؃m��m��
|{лi�06��bg㨡ܧ[q'�f�d<a�e�g��<�1�SjI���s泎6yL�嚥�
��I�H�\H���秝TKf%y�FL(*ln��0���(��_���?�[$x�B�ړ7���]W�<��ɂ��i> �O��`G��4nb�հ�^ k��R���EnX7|X_\���+ ���aC��h>�p�#���ǰ���
_�
�P<=�@�����q	��|Q~U�� \�#�?X�X�7F���ˏ���S�p����I8;~�yw{���8��8��AMX^Y�g��/��<���$T���Q+��8hVp�9`�_>
G�q/,v����f�?9��n�{��� �i�p|�X��ʶ�%"�`��ʛ�c-˳�p�eb2W���
&cJ����jx��xKt��c�m�U�P#c���(�%���&ֶ�"�C�V��"eJɄ����8�Y��	.~��Ƃ���s>*�n�b,���C��2>�TD!�C�u��N�`b�g�Y���f�3D�yJF�A���fy���Ѳ8���E�1�F�O��a��Y E�p��T��i�x��u��E*F�n��F壢�a���6���%����n�=d��_�0� $U�ڃ������eX�?�����gS/LEK+B=f���F{t��b$b�DG�" � 0~$�%γ�t�t@���f��tL�X��(�aB�L�"IH�e��񽚝u���S�D0&�9� �$��Λ�;Q�$�$q�I�`%%Rj�$ˌ��!�k�S�x�ҥ�:CW�耧0�Jga@�i2��1g�5R������z�4�pp�e^8̈́X��iӧPT�ו�� 0	^��X�7UDn"���#Ixף�#����q��}��e�%'.��ਘ��+�I�#�� <���0  	�b
��Х �p�{:h5ϊ�px?�1��S����φp�T�~����J�:���qn�<�{\W7��} �����&�ura,ͥ��� ��H�$b,�(�H�����H��,���X�re���͓d���$���c�"�A��o"��g)�>+�QIB����w/����wc�.	��j�rP罀/u�5�� Z�K.q�R�&��rZ/��^� �rǩ�=uw�(�#Lwp�b��?¯aTs�\��9?���N���;]�%�S�V�<�����3h��*��VT�ۃ�Z�9���r�Y���9)��'M֑ڰ��DFI9G�q�u�P�ǂnHY�وnQ��T)ˢ(S	�M@�(��z��c�4�P�9�LhHX:ׄFFA*u�J������#bw�GhD��'V���.v�Z�E#�1^+u��+�f����2�6�}C�5@��"�e���^���î��VoT�M\p#V��3?�xZ4rmC��:3l���W���ҔB���k�S��[ g}�o��2�A�L���;ա�5����Z(~ޣ�R#.��zr��O�O�y���PP�Q�r�x̒L�XX���$62ם�D�6�Q�U0�IM�`*�)��	^xB��p��Nm*�V� v�D��A0�B>3�:%2�����u|Q�t�5��Vo�����r�J�1�l��$Q�������+l�7��P�M]\�
[~�w�uV���mgE�Gh�KY�ѵF�̩�*����a�b�����ա����K�u1����{�諸 ��0y�\,pʭ�F��Yt�}Jb�ҁ�1�)I -��p�"�ns�c�j�(�u�b6v,TF*��? �k�T�	M1�!��s�;���+�s,I�T�Cm�y)��)�� R�UH��j-؆5�1�F)B ������S @%>*�N���M)�6���&׍J�Yz\�:B�!�ֈ�����������!�aذbU~�r�z��j�7�ng��J85��^�_-4]�h#�^�z+�qP��4�����ЫB�Z����2�J�}�������;�Rd0r��|P'u���.�M���A�'!t�H��1O�d #���f�������lLY<�R
Y�a��Vh�eV&�����@�!iL!�I ˴5:��D�+c�$��`��}���x�qm-�� �,�yRN��!P/��Nߢ�
�e ��H$���db�f�����җ_����I�E���u�-����b�"������u��<I�g�����H���e���jh˞�dWe������j-���Ѣ�o/L��ʾ���(�/Hh�ϝ>�*�r�-P������� Ma�媗y$�Jӡ�����'w����`>�z2�e Qԩp�)YЉ;8�Tծ�zS�"����/܂�ج��2��GO�qEu��\UO�qo�"yr�X�+��^t�V���A�L+�8�N1Emܠ�Q��4N	'�R��(�IJ�8��&���:Y�M$1*b�C�����Z�,���'��e��!���P�J��eLΈ����x���{����ⲧ�e'���z�-�;�i��'ꨢ~a�� v8�<^s4��.�P�2��l����Q�pr��H�N�0����sn)�o&�'���C���UW�
���4��]ǝ|�Q`��S���G�����pg��_�g��Bk S�k�IE��kt��7�U�	>{���� A����s��������?�J9�RG��\�)����p����o6��p���1����kwz"��� ����:�Ԇ�a��Z��Ō�Le����U��|�����y[f��P5k�7����$��){�iG�8��J�9��D�2iY��|ؾp��� �S@Q      #   W   x�sr��t�I�J-RH��W�K��

�f��B�!��)�p!w77N�̜T�����"a��%w�6���nH����qqq !+v      &   [   x�37PU(�ϩL-.I-�Q0r��KJ��8��}8��Z�	VQ�
T���p�B���[����^]�Pqxa.�9^S	�rdbjW� ��8g      +      x�3���4�4�2�4�1~\1z\\\ ,��      -   =   x�3�4202�5��56P04�20�25���\��"jh�,�3B�4E��`Qi�P���� �      7   >   x�st�,}�kq�BI����
e��W�q��q�e^��z{pzg^����qxA^:W� �      "   �  x���=o�F�g�Sp�hRw�;�ԛiI�EK���%��^(�/z�VE�d�P ��Z4�5tP��o�#m�J,#�'�p�s���p�6���xm��t����0.��Պ�p8���x������WF�ܨV^zZ��ͺ<n#�����>W�~�,�|�������O?�|~����w�7?ؾ�N�������7��5����w�{��<��+�n�c|�~r���M��;�e�*�" g�#oas (@  �C5�i�PN�xS˱Ì��"+Ȱ�H��H�
�oE�h��p��7����U������ղ�X�b3ȷ.}�9���٭}u���!����=�&�L~�ѫ�*�;��s_�sV3��!U�{����*T�� 1@,Q��4�eD ��
��ލ�b�ږ�@�:��hO|��+���.��xa�WW�zzY]���e�h�4d��N��Kƹ�8�ݾ�]��ZφU!!�(=�]�C)+)Y����8vÐJ�Ud �b�(�a�!�� 
(��	[�*��PUd
ȵ�jIX��P,|w���.n�Kz��4�zs3l��x��xSx�QY��m��ĉ�đ+�Y���\��o��b�C��Oo��7��Dnw����^��������:>�d|d/�@H�R	�51��3�٫�Lg�*��q�\ґ��o��������Hn��bwi���\#�WE��d=�m�N R��������%�ѳ�Y�1DǺ�,d���n�*`�5���D@��p;�������� ti�KKX5����	U�(Ϡ���Y��X�.ߊ:Ys�d�����#����������o�`$��h�$g~JT	J$�� �S)��N+p��//F |���뺽`����*m�qFk,��j�W���(��^��z��;lv�D�3��港I��%5)��q�Sh*S�O&�!cٗ�/�ZVYmȊ�%�@�&҇�HM�!�NE{=��rtf�W�Q���V7s�R��[�9����a�V�$�@iˋ��q��[��A�x��t�����S���~���5�7�񣼰��=�JVREʼ��I2�����x���*:#�3�zv��1�~g���U���(���U����ʋ���@�ѭ�����x���>�O�>c9rx=^sB�ɦ�M���6��*�=�&����1YE�_Ob�G�v����'�@J�"A��r?L	�������ɿ��*i     