PGDMP     2                	    y         
   qlnmauphuc    13.4    13.4 X    -           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            .           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            /           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            0           1262    16545 
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
       public          postgres    false    221            1           0    0    cloth_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cloth_id_seq OWNED BY public.cloth.id;
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
       public          postgres    false    208            2           0    0    measurements_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.measurements_id_seq OWNED BY public.measurements.id;
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
       public          postgres    false    219            3           0    0    order_details_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;
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
       public          postgres    false    215            4           0    0    order_status_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.order_status_id_seq OWNED BY public.order_status.id;
          public          postgres    false    214            �            1259    16655    orders    TABLE     2  CREATE TABLE public.orders (
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
    order_userid integer
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
    product_introduction1 character varying(100),
    product_introduction2 character varying(100),
    product_introduction3 character varying(100),
    product_introduction4 character varying(100),
    product_introduction5 character varying(100),
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
       public          postgres    false    204            5           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
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
       public         heap    postgres    false            �            1259    16643    test2    TABLE     W   CREATE TABLE public.test2 (
    id integer NOT NULL,
    t1 integer,
    t2 integer
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
       public          postgres    false    210            6           0    0    test2_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test2_id_seq OWNED BY public.test2.id;
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
       public          postgres    false    212            7           0    0    test3_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test3_id_seq OWNED BY public.test3.id;
          public          postgres    false    211            �            1259    16556    users    TABLE       CREATE TABLE public.users (
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
       public          postgres    false    201            8           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            m           2604    16737    cloth id    DEFAULT     d   ALTER TABLE ONLY public.cloth ALTER COLUMN id SET DEFAULT nextval('public.cloth_id_seq'::regclass);
 7   ALTER TABLE public.cloth ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            h           2604    16633    measurements id    DEFAULT     r   ALTER TABLE ONLY public.measurements ALTER COLUMN id SET DEFAULT nextval('public.measurements_id_seq'::regclass);
 >   ALTER TABLE public.measurements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            l           2604    16684    order_details id    DEFAULT     t   ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);
 ?   ALTER TABLE public.order_details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            k           2604    16666    order_status id    DEFAULT     r   ALTER TABLE ONLY public.order_status ALTER COLUMN id SET DEFAULT nextval('public.order_status_id_seq'::regclass);
 >   ALTER TABLE public.order_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    215    215            g           2604    16575    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            i           2604    16646    test2 id    DEFAULT     d   ALTER TABLE ONLY public.test2 ALTER COLUMN id SET DEFAULT nextval('public.test2_id_seq'::regclass);
 7   ALTER TABLE public.test2 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    210    210            j           2604    16652    test3 id    DEFAULT     d   ALTER TABLE ONLY public.test3 ALTER COLUMN id SET DEFAULT nextval('public.test3_id_seq'::regclass);
 7   ALTER TABLE public.test3 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            f           2604    16559    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            *          0    16734    cloth 
   TABLE DATA           x   COPY public.cloth (id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image) FROM stdin;
    public          postgres    false    221   n                 0    16605 
   clothtypes 
   TABLE DATA           1   COPY public.clothtypes (id, ct_name) FROM stdin;
    public          postgres    false    206   \p                 0    16630    measurements 
   TABLE DATA           
  COPY public.measurements (id, m_userid, m_neckline, m_bust, m_waist, m_buttock, m_shoulderwidth, m_armpitcircumference, m_biceps, m_wristaround, m_sleevelength, m_shirtlength, m_crotchlength, m_thighcircumference, m_dresslength, m_pantslength, m_gender) FROM stdin;
    public          postgres    false    208   �p       (          0    16681    order_details 
   TABLE DATA           +  COPY public.order_details (id, od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength) FROM stdin;
    public          postgres    false    219   �q       %          0    16669    order_paymentmethod 
   TABLE DATA           ;   COPY public.order_paymentmethod (id, opm_name) FROM stdin;
    public          postgres    false    216   �s       &          0    16674    order_shippingmethod 
   TABLE DATA           <   COPY public.order_shippingmethod (id, osm_name) FROM stdin;
    public          postgres    false    217   "t       $          0    16663    order_status 
   TABLE DATA           3   COPY public.order_status (id, os_name) FROM stdin;
    public          postgres    false    215   mt       "          0    16655    orders 
   TABLE DATA             COPY public.orders (id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid) FROM stdin;
    public          postgres    false    213   �t                 0    16572    products 
   TABLE DATA           �  COPY public.products (id, product_code, product_typeid, product_name, product_price, product_old_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3) FROM stdin;
    public          postgres    false    204   �x                 0    16565    producttypes 
   TABLE DATA           3   COPY public.producttypes (id, pt_name) FROM stdin;
    public          postgres    false    202   ̀                 0    16600    test 
   TABLE DATA           :   COPY public.test (t_material, t_code, t_name) FROM stdin;
    public          postgres    false    205   3�                 0    16643    test2 
   TABLE DATA           +   COPY public.test2 (id, t1, t2) FROM stdin;
    public          postgres    false    210   ��       !          0    16649    test3 
   TABLE DATA           1   COPY public.test3 (id, date1, date2) FROM stdin;
    public          postgres    false    212                    0    16556    users 
   TABLE DATA           �   COPY public.users (id, user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_city, user_tel, user_status, user_date, user_avatar, user_email) FROM stdin;
    public          postgres    false    201   ��       9           0    0    cloth_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cloth_id_seq', 1, false);
          public          postgres    false    220            :           0    0    measurements_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.measurements_id_seq', 14, true);
          public          postgres    false    207            ;           0    0    order_details_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.order_details_id_seq', 16, true);
          public          postgres    false    218            <           0    0    order_status_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_status_id_seq', 9, true);
          public          postgres    false    214            =           0    0    products_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.products_id_seq', 9, true);
          public          postgres    false    203            >           0    0    test2_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test2_id_seq', 6, true);
          public          postgres    false    209            ?           0    0    test3_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test3_id_seq', 2, true);
          public          postgres    false    211            @           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
          public          postgres    false    200            �           2606    16739    cloth cloth_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT cloth_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT cloth_pkey;
       public            postgres    false    221            w           2606    16609    clothtypes clothtypes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.clothtypes
    ADD CONSTRAINT clothtypes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.clothtypes DROP CONSTRAINT clothtypes_pkey;
       public            postgres    false    206            y           2606    16635    measurements measurements_pkey 
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
       public            postgres    false    217                       2606    16668    order_status order_status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.order_status DROP CONSTRAINT order_status_pkey;
       public            postgres    false    215            }           2606    16659    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    213            s           2606    16580    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    204            q           2606    16569    producttypes producttypes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.producttypes
    ADD CONSTRAINT producttypes_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.producttypes DROP CONSTRAINT producttypes_pkey;
       public            postgres    false    202            {           2606    16654    test3 test3_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test3
    ADD CONSTRAINT test3_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test3 DROP CONSTRAINT test3_pkey;
       public            postgres    false    212            u           2606    16604    test test_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (t_material, t_code);
 8   ALTER TABLE ONLY public.test DROP CONSTRAINT test_pkey;
       public            postgres    false    205    205            o           2606    16564    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    201            �           2606    16750    order_details FK_CLOTH    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_CLOTH" FOREIGN KEY (od_clothid) REFERENCES public.cloth(id) NOT VALID;
 B   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_CLOTH";
       public          postgres    false    219    2951    221            �           2606    16740    cloth FK_CLOTHTYPES    FK CONSTRAINT     ~   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_CLOTHTYPES" FOREIGN KEY (cloth_typeid) REFERENCES public.clothtypes(id);
 ?   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_CLOTHTYPES";
       public          postgres    false    221    2935    206            �           2606    16727    order_details FK_ORDERS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_ORDERS" FOREIGN KEY (od_orderid) REFERENCES public.orders(id) NOT VALID;
 C   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_ORDERS";
       public          postgres    false    2941    219    213            �           2606    16755    orders FK_ORDERSTATUS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_ORDERSTATUS" FOREIGN KEY (order_statusid) REFERENCES public.order_status(id) NOT VALID;
 A   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_ORDERSTATUS";
       public          postgres    false    213    215    2943            �           2606    16687    orders FK_PAYMENTMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_PAYMENTMETHOD" FOREIGN KEY (order_paymentid) REFERENCES public.order_paymentmethod(id) NOT VALID;
 C   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_PAYMENTMETHOD";
       public          postgres    false    213    216    2945            �           2606    16722    order_details FK_PRODUCTS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_PRODUCTS" FOREIGN KEY (od_productid) REFERENCES public.products(id) NOT VALID;
 E   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_PRODUCTS";
       public          postgres    false    2931    219    204            �           2606    16595    products FK_PRODUCTTYPES    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_PRODUCTTYPES" FOREIGN KEY (product_typeid) REFERENCES public.producttypes(id) NOT VALID;
 D   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_PRODUCTTYPES";
       public          postgres    false    202    2929    204            �           2606    16692    orders FK_SHIPPINGMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_SHIPPINGMETHOD" FOREIGN KEY (order_shippingid) REFERENCES public.order_shippingmethod(id) NOT VALID;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_SHIPPINGMETHOD";
       public          postgres    false    2947    213    217            �           2606    16697    orders FK_USERS    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (order_userid) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_USERS";
       public          postgres    false    2927    213    201            �           2606    16745    cloth FK_USERS    FK CONSTRAINT     t   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (cloth_userid) REFERENCES public.users(id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_USERS";
       public          postgres    false    201    221    2927            �           2606    16636    measurements FK_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT "FK_users" FOREIGN KEY (m_userid) REFERENCES public.users(id) NOT VALID;
 A   ALTER TABLE ONLY public.measurements DROP CONSTRAINT "FK_users";
       public          postgres    false    208    2927    201            *   8  x������@���SL��0�k�rcɑ6ʅ*�#`�X��<D�v�]�"E�1E
��o��1�ܜ5q������t0Ү���I��GW0�B�����pc��3�=yж}��=�íE]��� �4�����-PTom9$T�>�\U�T��X�|��t$���������?�,�-��]H�;��d�g?��<�tMx����&^�ԕ���Av���e�<��??��)�g(�Y,�`\��m���E�ZkI��Ul��(�9�z�WZ�4V�*W!�ZBfgB��:/�hR�:�5>�ʬ>��� �
n��}�Ka���l9����bф��zOP�l9��9��5���W��=��p/w����/���!�)7�o[抚����V|� �/��2{&�[��«�9[�~�q�ҧ�;��1h�>e� �߯oX�����:��9[$�J������[t�6_'���W�>N�����Ê�æPW��`��_t��<Y������v��"�D��x�\nx��)X�2�A�|J0�9_�>-j�����k:FXC�����q�yѸ��N'?(���/��Œ         r   x�sv��{�kq�BrbQ>WX���_��S�Z\�Z�������k�BI��]�K2���P�x��7�+���&;���d���y�
�w���
��Y��p�n�b��=... �7�         �   x�uQ;�0��a*�F��ҥC:��_R�B��'�eY���i�F@������^᫔�51H�{�G�j)�R��t���sz>cI�FP�N%��_�n�U��'<N�k%��S�+�*	)��8���W�K�H�H�u�G����㸯V�P7w�$�6���Cٟ��A.�?�S5�P}�9W~�Zk_Tmm�      (     x���[�!E��8��^���������&�ъ(�ql]���6��C�t@p����=���"�R,dx��٩⟞{�~�?�\�o�p��6@uug���$�����byxnR�M�.]����Po�W��X���n�ܝ�[�v�����xj�Q�w����ZY��Q��u���J�����[�Z�Գ�9Pc��|��=A� �D<N�^��
��hC���"T��{��Ө�&��:�#�=� �����7"Q��2�������D?���X/�����t��v�1���#��.��-�u�/��Y(�/pV˴�������z���q�������\*�ú'����fP�l�h�nY�ǈ�v�n� Zda�H7���{�֪/��U��+�#lU@u=6��Rع($Yn��l�%�j_�Z�Z翇�8=��A8	g���){���z>�g�Ya�M���P1��Ui<L�,t�����-�Z��&�
k1��1��}�pf���{П?��/z]�      %   L   x�s�w��H��P(�?�0O!;#S!=31_!����tgM.�p_E�y9�y�
���
e��*����s��qqq F��      &   ;   x������x�km�B��y�
%w-�T�rr+��C�8�3�A�@5 q�=... �L�      $      x�3�<2!1/]��ć�g*T<ܽV!��^.C�8X�$H)�&Vr �/V�(}�{;�Tc��]K+��Z��e�6�(2*��ҹL�r@�k��3J+�n��2���?� O�hL	W� s@@I      "   x  x�՗;n[W��Upgg��V6 Eb9�`7i��`3E�"ed!������$s�P&)A���� ȃ 9f���$�N<P�����
���16ϩO�o?�|�����_�n7�'q�+�ds*w��6�^7���~���͋�?��n����}BbM�R�4]�����޾�7���O�L@Hƙ��ҝFGZP�Ǆ�ËW_OW�/M��מ��
�s�TJ�Qbn��u9$���8��}Ů~�qLq�����雫ˉ�&lD�����U�6��G�qe�Y�iv�OiߕKW6����%�M�W�3��I��C��7j��F)C�^@t Z{p$Z��g
�;�d?]wc��{�MM�CM���!�B�{@�F�ŭHC4k����w��+xw:��BR��bS�}�^��``�5&O]{���W����{����̗7���r�b���^�{r��ĵ��/�-����m�,�q(Q��蝋�Jp����Kx0����,��,-�X����T^��R�uh�/R�G����K9y{�E�T)"������! ^�G���3���p�|�Ew1RӘ���$,)P5�N�B�]�z�h���~vrBs�����E-4s�f���#p�!�*�z;k_�i�i�r�����N]�Ҕ��%� H�[ ���j$�!?<��#M z��槳� <���Q��7�<r)5T��n���uV:��i�Ǔe��9[h`�v�B_�����[��]kW���rƱ��`�ִz@���C�\t�ĖoZo��k3��c�=6W�[���Û�K6�pS$�Ӕ��ӭfgI1�i?������N��*��UH> /����]Y��h5ۊM'w�#���j�ub�P�}�%[ZI]�>����5q�8~xzqq��#4�         8  x��X]��}��|�V;r>��&p
�.�&0����!9;�J#U�^��F�����at��Ql�E�d�`�?���C�����^y���a�jF���s�9T�ݹ�{�y_ܸ�U�:d��2��m���b��������ܨj���t<��O��>�����{��)j�A5j�U���H��:4���j�����W���z������G��qޭ�]#_��=���P}? j:�׀��!)s�����w�;����\���;6͑�a���0�9�<.H9��H��Y}i���qbM'/����b�FZ�Q�0�I����t�I�R���#�nֽ�q�U��v�6�nMǣ&�{܆:�sXr:>��-_�w*�����>Lǿ����yU���f0+�!���� �1���L�'m����'O`/�sAkDO'��!nI��,�֪��Ļ�m�jmA%;��nv>yT��o5;����$�)�;�h'��I�F�Xu���T�D/�@y�x3�U���r?�A6쬮E>=Y��{Ͷ�7�=�㞃�^
��7�]�f�[�oՕ=�4|!Mbh�\�Dĉ4YI��8f����W��!�/��R+�FP��0a�	�F���Q#R�IEF>)&3Q�y�šNS;�y���5ۥ�of�K[��Y��鈆o�o�m	�7���Ҏk��`�k|�k�#�v�%��{�f��򭒋|�W�a�2 9B�@4��e{I�@�w�"^b�ԀO����!�^kp�! ������2���@��p4��Մ�O�����Ҷ������MK�)�=�'�j��:-���3���;��@�<!����:�	��({�))�q��Ј��f���ݶkpo�:H4*,���%� +{6F��ae@.��1<K"�I��Y*?��2`T���g�v�7=��f�Ʉ�Ƥ\3-ꄦ,�Bg�\�X~����!t���BK.t��,2�D�[2���qcE�����F��NF���x@�5���lSp��Q�������(@>����!�q�T���0`��iO�:�����My�n)�u���n��܊�"�C7��iN�im�5,�\���X�Z�PS���dsX���p~�t��r�����4� �)vxV[�k����}<�v�Ʈ�3���C��L�m���ز�*��q����s �Zh��}��ІeRJH��N�/t�s�$�%4ڔ��ٻ�oƃ(����$�R�u�Mf��\ҙ� �a4g"
@����݆���:Cj�n�z׿�.�Feiٗ8}=��; ��CXm�سocg��@�Q�[�ݳF�=��Y,��s���%�O)��::�h%�o�u��{sD���NA��kA�)��r�WE�6pd���A����fW*`��b+IW�BP`t
��vr8 ���#e����UC�!���M�%���bd�I�Ȃ�(W�˭�($��:��=*�JF��iu.�5g��b�t������h7l�,4q(�P&�'Bǩ/)M���l�v,g'���*2*8�)h�,e,�T%����gahh���C�TDL��K�h��R�{��������KH�g���uVߍ/|�]4�� �	�O|��Lmk�L�
�S�o�I��;�X�]��AJ����Qn�L9( T�3�$�}9�s~��{֑���/�#�['d���'u}�,�>ҥ�6U=�on�:��j��\�+h5В:iH�y�P�a�P�$1S*
�����je6�F�S��q���p�OҐ�Є`�� �@ �0TjCU1��P@*�)�|-h��-�B<�ė�����.GXC��'�d�x�-v%��bMRx�r�	꿢��_� �|�n�פh���1�u(#�^8Y����%��ځ
��7a骜)�o�5��2}wNA���X��V��˗.�N�ݾky�� ��
oW�0���{��ґ")�����������:6��[����|~�?t~��&n0P-?�b�〇��0,�*
h�e�m��m?Fͣ�ד�	��HENp�C�c�t��0��@ێS�8�]?T:�TP4�`��ϙ��L�Aj\K������� 0         W   x�sr��t�I�J-RH��W�K��

�f��B�!��)�p!w77N�̜T�����"a��%w�6���nH����qqq !+v         [   x�37PU(�ϩL-.I-�Q0r��KJ��8��}8��Z�	VQ�
T���p�B���[����^]�Pqxa.�9^S	�rdbjW� ��8g            x�3���4����� ��      !   (   x�3�4202�5��56P04�20�25���\�+F��� �~I           x���Mn�@���)�`���W� 	I�6	A���{Hl�m�dWU�G���e��#7�ABJ�H�:��-���}��&�w�JAO��3��c_�8��ك��{��X��'���m�bk���l�xf����kF
쏜j1ҡ�#�!�`�ap�1B�0U"�07�Z23Wy���Ș/#ps^#����j��R�G��x�5�a�����c8Eag�Yf����ᇹ�(~:)��p�׼<N�˟�R@�m�#�M��TWY���zy��:�/߿�Z��Z�afSd��~�Z;>��_p��9f	$t�籚�=���L�Q"Ճ1]$5��.¼8�ᤌ������i�|����&��f�M6=��]�ݫΔ�xm[� �|IcЏ��ڈ1$ "o`�!�q��@�`��w`	�T�ש�!��̺�2�(B(�-gU�lA0ȶ���6�k�xe����+�B^��|dx�E�TN�^�������[�`�r�9!Z���^�j��z��^Q8�r�m� '����J�z��Z�7�A��     