PGDMP                     	    y         
   qlnmauphuc    13.4    13.4 [    1           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            2           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            3           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            4           1262    16545 
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
       public          postgres    false    221            5           0    0    cloth_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cloth_id_seq OWNED BY public.cloth.id;
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
       public          postgres    false    208            6           0    0    measurements_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.measurements_id_seq OWNED BY public.measurements.id;
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
       public          postgres    false    219            7           0    0    order_details_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;
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
       public          postgres    false    215            8           0    0    order_status_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.order_status_id_seq OWNED BY public.order_status.id;
          public          postgres    false    214            �            1259    16655    orders    TABLE     N  CREATE TABLE public.orders (
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
    order_tailorid integer
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
       public          postgres    false    204            9           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
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
       public          postgres    false    210            :           0    0    test2_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test2_id_seq OWNED BY public.test2.id;
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
       public          postgres    false    212            ;           0    0    test3_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test3_id_seq OWNED BY public.test3.id;
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
       public          postgres    false    201            <           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    200            m           2604    16737    cloth id    DEFAULT     d   ALTER TABLE ONLY public.cloth ALTER COLUMN id SET DEFAULT nextval('public.cloth_id_seq'::regclass);
 7   ALTER TABLE public.cloth ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    220    221            h           2604    16633    measurements id    DEFAULT     r   ALTER TABLE ONLY public.measurements ALTER COLUMN id SET DEFAULT nextval('public.measurements_id_seq'::regclass);
 >   ALTER TABLE public.measurements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            l           2604    16684    order_details id    DEFAULT     t   ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);
 ?   ALTER TABLE public.order_details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            k           2604    16666    order_status id    DEFAULT     r   ALTER TABLE ONLY public.order_status ALTER COLUMN id SET DEFAULT nextval('public.order_status_id_seq'::regclass);
 >   ALTER TABLE public.order_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            g           2604    16575    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    203    204            i           2604    16646    test2 id    DEFAULT     d   ALTER TABLE ONLY public.test2 ALTER COLUMN id SET DEFAULT nextval('public.test2_id_seq'::regclass);
 7   ALTER TABLE public.test2 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            j           2604    16652    test3 id    DEFAULT     d   ALTER TABLE ONLY public.test3 ALTER COLUMN id SET DEFAULT nextval('public.test3_id_seq'::regclass);
 7   ALTER TABLE public.test3 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            f           2604    16559    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            .          0    16734    cloth 
   TABLE DATA           x   COPY public.cloth (id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image) FROM stdin;
    public          postgres    false    221   r                 0    16605 
   clothtypes 
   TABLE DATA           1   COPY public.clothtypes (id, ct_name) FROM stdin;
    public          postgres    false    206   wt       !          0    16630    measurements 
   TABLE DATA           
  COPY public.measurements (id, m_userid, m_neckline, m_bust, m_waist, m_buttock, m_shoulderwidth, m_armpitcircumference, m_biceps, m_wristaround, m_sleevelength, m_shirtlength, m_crotchlength, m_thighcircumference, m_dresslength, m_pantslength, m_gender) FROM stdin;
    public          postgres    false    208   �t       ,          0    16681    order_details 
   TABLE DATA           +  COPY public.order_details (id, od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength) FROM stdin;
    public          postgres    false    219   �u       )          0    16669    order_paymentmethod 
   TABLE DATA           ;   COPY public.order_paymentmethod (id, opm_name) FROM stdin;
    public          postgres    false    216   �w       *          0    16674    order_shippingmethod 
   TABLE DATA           <   COPY public.order_shippingmethod (id, osm_name) FROM stdin;
    public          postgres    false    217   Kx       (          0    16663    order_status 
   TABLE DATA           3   COPY public.order_status (id, os_name) FROM stdin;
    public          postgres    false    215   �x       &          0    16655    orders 
   TABLE DATA             COPY public.orders (id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid) FROM stdin;
    public          postgres    false    213   %y                 0    16572    products 
   TABLE DATA           �  COPY public.products (id, product_code, product_typeid, product_name, product_price, product_old_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3) FROM stdin;
    public          postgres    false    204   �|                 0    16565    producttypes 
   TABLE DATA           3   COPY public.producttypes (id, pt_name) FROM stdin;
    public          postgres    false    202   �                 0    16600    test 
   TABLE DATA           :   COPY public.test (t_material, t_code, t_name) FROM stdin;
    public          postgres    false    205   |�       #          0    16643    test2 
   TABLE DATA           +   COPY public.test2 (id, t1, t2) FROM stdin;
    public          postgres    false    210   �       %          0    16649    test3 
   TABLE DATA           1   COPY public.test3 (id, date1, date2) FROM stdin;
    public          postgres    false    212   �                 0    16556    users 
   TABLE DATA           �   COPY public.users (id, user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_city, user_tel, user_status, user_date, user_avatar, user_email) FROM stdin;
    public          postgres    false    201   H�       =           0    0    cloth_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cloth_id_seq', 1, false);
          public          postgres    false    220            >           0    0    measurements_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.measurements_id_seq', 14, true);
          public          postgres    false    207            ?           0    0    order_details_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.order_details_id_seq', 17, true);
          public          postgres    false    218            @           0    0    order_status_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_status_id_seq', 9, true);
          public          postgres    false    214            A           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 10, true);
          public          postgres    false    203            B           0    0    test2_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test2_id_seq', 7, true);
          public          postgres    false    209            C           0    0    test3_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test3_id_seq', 2, true);
          public          postgres    false    211            D           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 5, true);
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
       public            postgres    false    217            �           2606    16668    order_status order_status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.order_status DROP CONSTRAINT order_status_pkey;
       public            postgres    false    215                       2606    16659    orders orders_pkey 
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
       public            postgres    false    202            {           2606    16766    test2 test2_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test2
    ADD CONSTRAINT test2_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test2 DROP CONSTRAINT test2_pkey;
       public            postgres    false    210            }           2606    16654    test3 test3_pkey 
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
       public          postgres    false    221    2953    219            �           2606    16740    cloth FK_CLOTHTYPES    FK CONSTRAINT     ~   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_CLOTHTYPES" FOREIGN KEY (cloth_typeid) REFERENCES public.clothtypes(id);
 ?   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_CLOTHTYPES";
       public          postgres    false    221    2935    206            �           2606    16727    order_details FK_ORDERS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_ORDERS" FOREIGN KEY (od_orderid) REFERENCES public.orders(id) NOT VALID;
 C   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_ORDERS";
       public          postgres    false    2943    219    213            �           2606    16755    orders FK_ORDERSTATUS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_ORDERSTATUS" FOREIGN KEY (order_statusid) REFERENCES public.order_status(id) NOT VALID;
 A   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_ORDERSTATUS";
       public          postgres    false    213    215    2945            �           2606    16687    orders FK_PAYMENTMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_PAYMENTMETHOD" FOREIGN KEY (order_paymentid) REFERENCES public.order_paymentmethod(id) NOT VALID;
 C   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_PAYMENTMETHOD";
       public          postgres    false    213    216    2947            �           2606    16722    order_details FK_PRODUCTS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_PRODUCTS" FOREIGN KEY (od_productid) REFERENCES public.products(id) NOT VALID;
 E   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_PRODUCTS";
       public          postgres    false    219    2931    204            �           2606    16595    products FK_PRODUCTTYPES    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_PRODUCTTYPES" FOREIGN KEY (product_typeid) REFERENCES public.producttypes(id) NOT VALID;
 D   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_PRODUCTTYPES";
       public          postgres    false    202    2929    204            �           2606    16692    orders FK_SHIPPINGMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_SHIPPINGMETHOD" FOREIGN KEY (order_shippingid) REFERENCES public.order_shippingmethod(id) NOT VALID;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_SHIPPINGMETHOD";
       public          postgres    false    213    217    2949            �           2606    16760    orders FK_TAILORS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_TAILORS" FOREIGN KEY (order_tailorid) REFERENCES public.users(id) NOT VALID;
 =   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_TAILORS";
       public          postgres    false    201    2927    213            �           2606    16697    orders FK_USERS    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (order_userid) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_USERS";
       public          postgres    false    201    2927    213            �           2606    16745    cloth FK_USERS    FK CONSTRAINT     t   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (cloth_userid) REFERENCES public.users(id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_USERS";
       public          postgres    false    201    221    2927            �           2606    16767 
   test2 FK_a    FK CONSTRAINT     p   ALTER TABLE ONLY public.test2
    ADD CONSTRAINT "FK_a" FOREIGN KEY (t2) REFERENCES public.test3(id) NOT VALID;
 6   ALTER TABLE ONLY public.test2 DROP CONSTRAINT "FK_a";
       public          postgres    false    2941    212    210            �           2606    16636    measurements FK_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT "FK_users" FOREIGN KEY (m_userid) REFERENCES public.users(id) NOT VALID;
 A   ALTER TABLE ONLY public.measurements DROP CONSTRAINT "FK_users";
       public          postgres    false    201    2927    208            .   P  x���ˎ�0���Sx3�1`reYe)���%�n��NbG`P�U�7����J��ݐET}ޤ�C���l�����0�ظ�;�yOBN�k8_���k(�ÝM�dVY��C�ܰ,���	�6���O�<6 �g/o���[�%�>�0��rM_�>�[ц�;ɍhM��n�F`Z=�P<:�sFs�|��n�ԅNv��tÐ�Ջ��u�\�׶ S9QTPǗQ��G����~x���E��K��O﷽�{{��3���-;˃H ��~�@���T�Q��b=�w�}TF���Ul��լjOKlj��·Yr�av���=���:\����Q-����\��ូ��Ĩ�G�����ަwQE�j��a�\�c��\�֎���e�Jf�?�7��9;��}��I�*�$߯�C�\����#\�e7���������V<�p|��"�g��`bV�Յz� ��%�8�ү��=ew�ޝ󘍸O8�|��0���,=�� �٥�j�l|Z��oBu�01�2��].��G���jw�u����̖e���q.c�YњZd�7Q
���i�X���[m0��P�e         r   x�sv��{�kq�BrbQ>WX���_��S�Z\�Z�������k�BI��]�K2���P�x��7�+���&;���d���y�
�w���
��Y��p�n�b��=... �7�      !   �   x�uQ;�0��a*�F��ҥC:��_R�B��'�eY���i�F@������^᫔�51H�{�G�j)�R��t���sz>cI�FP�N%��_�n�U��'<N�k%��S�+�*	)��8���W�K�H�H�u�G����㸯V�P7w�$�6���Cٟ��A.�?�S5�P}�9W~�Zk_Tmm�      ,     x���K�!EǼ�8��^2�_B\��[�Z=��BP�싥��C����Х��y�M�*T��b!�{$�N�����}��o��V�@�t����$��{T�]��GX+k�<��㾰ޜ�h0Uڶ�$�ak�SϚ�@��b��=A� �D<N�J{�me�!~�`� T��=d�i�NwK�	~/�{d���s~m����7"Q��R^�nr���r�_�1֋��k;��+��#c;�lg��2.�����/��=��L��NN��^�����Ž���ťr<�{ҚJ��0a�&����=F\��v;��F�aUޣ�V}�i�}���*�����c)�|($y�|]j�G����j�jA�'�D�K�sPCB���>�"{G������]_d��6�K"@��6�V��0I��%����Mn-Quc���@��t�>m83F��!�l�Q�_=͠+��Xj%�{:����e�N�gqYnTW�q&��M�*�ؠ���Х�f���:x��윻Q͢���������-�a      )   L   x�s�w��H��P(�?�0O!;#S!=31_!����tgM.�p_E�y9�y�
���
e��*����s��qqq F��      *   ;   x������x�km�B��y�
%w-�T�rr+��C�8�3�A�@5 q�=... �L�      (      x�3�<2!1/]��ć�g*T<ܽV!��^.C�8X�$H)�&Vr �/V�(}�{;�Tc��]K+��Z��e�6�(2*��ҹL�r@�k��3J+�n��2���?� O�hL	W� s@@I      &   �  x�՗;n[W��Up���<n�R$�SN��<-1S�.RA�*{�� ��N2�e�! ��EB����3��C,�ua�\�A����8|��S����?�}�m�y�ׯ�ͳ�%}!O6�������ۻ��|x�y~���ͫ����&��0Mׯ��ٗo������M�8ܐ�)Β4<҂:{M�����Wӫ�&����J���B�UA('H�t %��A����q&9CY4{�=�Q���y�����W�.@1���>').@T0ڈ<Z�ƕ�x&=�k>��7����PhA�!s�P2٘yu�cF��F�0b��_G���h��f*C�^�u8gMr#��(4c8G�k�˘���W=�Y�j�F�j�"5B!���zbYq�4�<h��qO���Z��x���33�`lC�Ǯ=��~�fwn�v��v�������#Ĉ�Ҁ�<��(��D���3���w�Ɗ�fǙ��s("G��;K� ��I��P!:�9h�`�r����5��.h�;E[���Pl5���n򮢼��,����������I���Ñv9a>E��HFj����n[
���#��}�^dZ�4���O��#��Kԁ�B�m�l�\��9��Su���-e������m9$�=L�;�-KS���24 ;�޲rt���-�ɠiz`ы(6H����̐Gɖ.Ԡ�ȥ�P�;0��uV<G�k�(g#f�r�0q-�=�|�RJ;�D��p��c���͎�P�bךVNR��h���@7��͑�zn��f<�ʢ=2`�!Y8��튷�/���:������K�O�r��P�Ů�v����B��A�(+�כ�NK+�|7�\�G�#ּt$�V�_IfcI%C�6�l�����X�M�tp�n}�!Bj"P"�Ռ�n��B2l�.=9��������`�<������{�         (	  x��XA��H>�E]��N�\e����VVhg��RT.���N�l�饹�h5Z!�p��
�%�Ъa�03H#������}�*���ag�E�'U�^=���r�]9�G�{�_��[���)Հ��e�K�����#���T���t�_��^�ϻ���7��ɍf2��*O��a�?4������Ao_W��'��?Tefnx4X�]��e�|�k���}�<=��kL�ԅ�p�����ʻ:�=S�땢�iNt�f�°�|v�$�|�)�^��,��C�5�=�z��]���GRI�����a�M�	,�vB��w#��Wͤ&�]m����餇�>@�{Xr>}W[����}���>̧?��)�yR�>��z�(�!�����1���̧G���ڇɳ;��	˹�>�泿���&�#X��ռ��b1>�i�ւZU��;��*��w��^�?%$	j� �Q�:�|r�U���gHe��$���W��/Ƌ���tX��8Ȇ]Ե,�#;^g�7P�f�㠹�Bm�{7�6b�3,wO5T#�v�Lbh""��D�D�\�*����������+�	dRj��0��4����\�4�Ξwc��QT�Qp�2ir����4����s_�m��n����n���]�z�h�d�n�4_�@�Ó,,�h���m��5���ڥ��l����ȷN.�i�|�����<E��#�%�h��|�Px���|z�z���Ǉ�Z��w%�	ȅtx�l���رzp�QY��U�B��ռ$c��`ރ�%�O�7��K5H�M�+˺�[�%��l%�2wHj?�h^�DA����/l�Q��ʹG�]hD�r3t��m�po�:H4)-��+�Vvl��&�ڀB�d]cx��T�$��<�t�Xr2*u���I��n�.M���RgƤ<c�
M�%4eBq������6e]�qc�̒X�<���2���aΒXsK��*>Ʌ�߷5�V�ll1Bš��Cqu�~,%�������7�Q���##�l�N� =��)]�uU�J�|�<:�`�,��иT������%�|��H��9�W=��d��xb����V�m۷+���^n ����z}ׄ �7�����QvL�<��( �)R������c�28r��dw߾x;��B):΂�18�L�S���Oˑ�eg@�ky*��+%��m!�b������x;�fydD$�H%�K%��4P�&Z"?߫�I�eIt�ÜJ�U
8���REu"��f�n�G��Q'�r��ʘe��'��Ԑ���n\8~͝a):�)L��9 �z�9-Cfq���0Yb���b�����\��	%��ʔ9_`=ru6l�NR�Q=�tNA�\���io�<�����pl�{����֟��'����.[/y`U�����T�Q4?Bd�	x�, ��8 �@	�հ�`�J��G`O*��Wd���Ʌaw�˕��-�
R�uy�!�`aPm�W�ز.*��a�ݜ�q <ۃ�:�g���̰\�PK���,
8O�o:���mt%�@�x.��y��,�L�`��9a�6Ю�8�q�>���0�>�T�F�p�{��}��Cwl�B_BJ<38נըZ�{�8�aW���&�>�3���L����7�(���B�ԃ�mA_���˥��nH�`��>\��9?a�#����M���c+(O�Q]ߦ�z����C����6N���ۖ�V�3$k1�����t�#�#D9h��&L�8b*%;E��f#7D��T�����A������� da�� �k��eT.�� X:ה��i Rj��G�$l�"��z��B��'�d�x����(�Ȗ�q�v�	;�����=@�c�n���k���"�@q��Y��یa����[*Pn$�J:\���˖ֶܾ;��2�bEk�wȸb%S)v�_����.���]_ä���l? �MR��iO�p�
��{�{�e/X܂�<���'��p�e��8���G���4,�t�0S���w�1jMi&%Oc388�ED��2��H�e�ӎS�8�� �YN�����gY����J�aj\w�
�:�5�x��o��{�{�ʋq������g#��_���˼�&���f������ݭu��b�kL�JVk�ڋ8��uWM���ډ͙Z��ڇ�ա���?G��v��.m�{{bշ^� ��(ř:�.�8���T��Yj�9a���@��ʘF K:Ʉ��ʥ0�ѡ��䌉�}�r6�=0p2Jc��(:M�XP#�A���=®�i`2#S8��(JU
>��A�GA�r��������Ez         W   x�sr��t�I�J-RH��W�K��

�f��B�!��)�p!w77N�̜T�����"a��%w�6���nH����qqq !+v         [   x�37PU(�ϩL-.I-�Q0r��KJ��8��}8��Z�	VQ�
T���p�B���[����^]�Pqxa.�9^S	�rdbjW� ��8g      #      x�3���4�2�42�b����  �      %   (   x�3�4202�5��56P04�20�25���\�+F��� ̭J           x���Mn�@���)�`���W� 	I�6	A���{Hl�m�dWU�G���e��#7�ABJ�H�:��-���}��&�w�JAO��3��c_�8��ك��{��X��'���m�bk���l�xf����kF
쏜j1ҡ�#�!�`�ap�1B�0U"�07�Z23Wy���Ș/#ps^#����j��R�G��x�5�a�����c8Eag�Yf����ᇹ�(~:)��p�׼<N�˟�R@�m�#�M��TWY���zy��:�/߿�Z��Z�afSd��~�Z;>��_p��9f	$t�籚�=���L�Q"Ճ1]$5��.¼8�ᤌ������i�|����&��f�M6=��]�ݫΔ�xm[� �|IcЏ��ڈ1$ "o`�!�q��@�`��w`	�T�ש�!��̺�2�(B(�-gU�lA0ȶ���6�k�xe����+�B^��|dx�E�TN�^�������[�`�r�9!Z���^�j��z��^Q8�r�m� '����J�z��Z�7�A��     