PGDMP     !    0                y         
   qlnmauphuc    13.4    13.4 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16545 
   qlnmauphuc    DATABASE     n   CREATE DATABASE qlnmauphuc WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE qlnmauphuc;
                postgres    false                        3079    16850    unaccent 	   EXTENSION     <   CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;
    DROP EXTENSION unaccent;
                   false            �           0    0    EXTENSION unaccent    COMMENT     P   COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';
                        false    2            �            1259    16734    cloth    TABLE     #  CREATE TABLE public.cloth (
    id integer NOT NULL,
    cloth_material character varying(100),
    cloth_name character varying(100),
    cloth_quantity integer,
    cloth_userid integer,
    cloth_typeid character(4),
    cloth_image character varying(100),
    cloth_isdeleted boolean
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
       public          postgres    false    217            �           0    0    cloth_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.cloth_id_seq OWNED BY public.cloth.id;
          public          postgres    false    216            �            1259    17027    cloth_log_detail    TABLE       CREATE TABLE public.cloth_log_detail (
    cld_logid integer,
    cld_old_name character varying(100),
    cld_new_name character varying(100),
    cld_old_quantity integer,
    cld_name_quantity integer,
    cld_old_typeid character(4),
    cld_new_typeid character(4)
);
 $   DROP TABLE public.cloth_log_detail;
       public         heap    postgres    false            �            1259    16605 
   clothtypes    TABLE     e   CREATE TABLE public.clothtypes (
    id character(4) NOT NULL,
    ct_name character varying(100)
);
    DROP TABLE public.clothtypes;
       public         heap    postgres    false            �            1259    16794    district    TABLE     �   CREATE TABLE public.district (
    id integer NOT NULL,
    district_name character varying(100),
    district_prefix character varying(20),
    district_provinceid integer
);
    DROP TABLE public.district;
       public         heap    postgres    false            �            1259    16990 	   eventtype    TABLE     �   CREATE TABLE public.eventtype (
    id character(3) NOT NULL,
    et_name character varying(50),
    et_functiontypeid character(2)
);
    DROP TABLE public.eventtype;
       public         heap    postgres    false            �            1259    16995    functiontype    TABLE     f   CREATE TABLE public.functiontype (
    id character(2) NOT NULL,
    ft_name character varying(50)
);
     DROP TABLE public.functiontype;
       public         heap    postgres    false            �            1259    17062    giamgia    TABLE     �   CREATE TABLE public.giamgia (
    id character varying(100) NOT NULL,
    giam integer,
    sudung boolean,
    ngay timestamp without time zone
);
    DROP TABLE public.giamgia;
       public         heap    postgres    false            �            1259    17067    giftvoucher    TABLE       CREATE TABLE public.giftvoucher (
    id character(20) NOT NULL,
    gv_discription character varying(100),
    gv_discount integer,
    gv_creationdate timestamp without time zone,
    gv_expirationdate timestamp without time zone,
    gv_isactivated boolean,
    gv_userid integer
);
    DROP TABLE public.giftvoucher;
       public         heap    postgres    false            �            1259    16984    log    TABLE     �   CREATE TABLE public.log (
    id integer NOT NULL,
    log_userid integer,
    log_eventtypeid character(3),
    log_date timestamp without time zone,
    log_description character varying(200)
);
    DROP TABLE public.log;
       public         heap    postgres    false            �            1259    16982 
   log_id_seq    SEQUENCE     �   CREATE SEQUENCE public.log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.log_id_seq;
       public          postgres    false    237            �           0    0 
   log_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.log_id_seq OWNED BY public.log.id;
          public          postgres    false    236            �            1259    16630    measurements    TABLE     �  CREATE TABLE public.measurements (
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
       public          postgres    false    208            �           0    0    measurements_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.measurements_id_seq OWNED BY public.measurements.id;
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
       public          postgres    false    215            �           0    0    order_details_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_details.id;
          public          postgres    false    214            �            1259    16669    order_paymentmethod    TABLE     n   CREATE TABLE public.order_paymentmethod (
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
       public          postgres    false    211            �           0    0    order_status_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.order_status_id_seq OWNED BY public.order_status.id;
          public          postgres    false    210            �            1259    16655    orders    TABLE     x  CREATE TABLE public.orders (
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
    order_shippingtime timestamp without time zone,
    order_wardid integer
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    17020    product_log_detail    TABLE     ^  CREATE TABLE public.product_log_detail (
    pld_logid integer,
    pld_old_typeid character(3),
    pld_new_typeid character(3),
    pld_old_name character varying(100),
    pld_new_name character varying(100),
    pld_old_price integer,
    pld_new_price integer,
    pld_old_color character varying(50),
    pld_new_color character varying(50),
    pld_old_material character varying(100),
    pld_new_material character varying(100),
    pld_old_lining character varying(50),
    pld_new_lining character varying(50),
    pld_old_size character varying(50),
    pld_new_size character varying(50),
    pld_old_thickness character varying(20),
    pld_new_thickness character varying(20),
    pld_old_softness character varying(20),
    pld_new_softness character varying(20),
    pld_old_elasticity character varying(20),
    pld_new_elasticity character varying(20),
    pld_old_introduction1 character varying(150),
    pld_new_introduction1 character varying(150),
    pld_old_introduction2 character varying(150),
    pld_new_introduction2 character varying(150),
    pld_old_introduction3 character varying(150),
    pld_new_introduction3 character varying(150),
    pld_old_introduction4 character varying(150),
    pld_new_introduction4 character varying(150),
    pld_old_introduction5 character varying(150),
    pld_new_introduction5 character varying(150)
);
 &   DROP TABLE public.product_log_detail;
       public         heap    postgres    false            �            1259    16572    products    TABLE     �  CREATE TABLE public.products (
    id integer NOT NULL,
    product_code character varying(10),
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
    product_image3 character varying(100),
    product_isdeleted boolean
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
       public          postgres    false    205            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    204            �            1259    16565    producttypes    TABLE     g   CREATE TABLE public.producttypes (
    id character(3) NOT NULL,
    pt_name character varying(100)
);
     DROP TABLE public.producttypes;
       public         heap    postgres    false            �            1259    16789    province    TABLE     �   CREATE TABLE public.province (
    id integer NOT NULL,
    province_name character varying(50),
    province_code character varying(20)
);
    DROP TABLE public.province;
       public         heap    postgres    false            �            1259    16874    test    TABLE     v   CREATE TABLE public.test (
    id integer NOT NULL,
    test1_id integer,
    test2_id integer,
    test_text text
);
    DROP TABLE public.test;
       public         heap    postgres    false            �            1259    16886    test1    TABLE     b   CREATE TABLE public.test1 (
    id integer NOT NULL,
    test1_text text,
    test1_text2 text
);
    DROP TABLE public.test1;
       public         heap    postgres    false            �            1259    16884    test1_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test1_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.test1_id_seq;
       public          postgres    false    227            �           0    0    test1_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test1_id_seq OWNED BY public.test1.id;
          public          postgres    false    226            �            1259    16897    test2    TABLE     b   CREATE TABLE public.test2 (
    id integer NOT NULL,
    test2_text text,
    test2_text2 text
);
    DROP TABLE public.test2;
       public         heap    postgres    false            �            1259    16895    test2_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.test2_id_seq;
       public          postgres    false    229            �           0    0    test2_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test2_id_seq OWNED BY public.test2.id;
          public          postgres    false    228            �            1259    16918    test3    TABLE     \   CREATE TABLE public.test3 (
    id integer NOT NULL,
    text text,
    test6_id integer
);
    DROP TABLE public.test3;
       public         heap    postgres    false            �            1259    16916    test3_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test3_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.test3_id_seq;
       public          postgres    false    231            �           0    0    test3_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test3_id_seq OWNED BY public.test3.id;
          public          postgres    false    230            �            1259    16929    test4    TABLE     I   CREATE TABLE public.test4 (
    test3_id integer,
    test4_text text
);
    DROP TABLE public.test4;
       public         heap    postgres    false            �            1259    16945    test5    TABLE     I   CREATE TABLE public.test5 (
    test3_id integer,
    test5_text text
);
    DROP TABLE public.test5;
       public         heap    postgres    false            �            1259    16961    test6    TABLE     L   CREATE TABLE public.test6 (
    id integer NOT NULL,
    test6_name text
);
    DROP TABLE public.test6;
       public         heap    postgres    false            �            1259    16959    test6_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test6_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.test6_id_seq;
       public          postgres    false    235            �           0    0    test6_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.test6_id_seq OWNED BY public.test6.id;
          public          postgres    false    234            �            1259    16872    test_id_seq    SEQUENCE     �   CREATE SEQUENCE public.test_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.test_id_seq;
       public          postgres    false    225            �           0    0    test_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.test_id_seq OWNED BY public.test.id;
          public          postgres    false    224            �            1259    17040    user_log_detail    TABLE     w  CREATE TABLE public.user_log_detail (
    uld_logid integer,
    uld_old_firstname character varying(30),
    uld_new_firstname character varying(30),
    uld_old_lastname character varying(30),
    uld_new_lastname character varying(30),
    uld_old_address character varying(100),
    uld_new_address character varying(100),
    uld_old_tel character varying(11),
    uld_new_tel character varying(11),
    uld_old_email character varying(100),
    uld_new_email character varying(100),
    uld_old_wardid integer,
    uld_new_wardid integer,
    uld_old_status character varying(10),
    uld_new_status character varying(10)
);
 #   DROP TABLE public.user_log_detail;
       public         heap    postgres    false            �            1259    16861    user_permissions    TABLE     @  CREATE TABLE public.user_permissions (
    id integer NOT NULL,
    up_userid integer,
    up_eccommercedashboard boolean,
    up_orderdashboard boolean,
    up_customeraccountmanager boolean,
    up_staffaccountmanager boolean,
    up_productmanager boolean,
    up_clothmanager boolean,
    up_ordermanager boolean
);
 $   DROP TABLE public.user_permissions;
       public         heap    postgres    false            �            1259    16859    user_permissions_id_seq    SEQUENCE     �   CREATE SEQUENCE public.user_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.user_permissions_id_seq;
       public          postgres    false    223            �           0    0    user_permissions_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.user_permissions_id_seq OWNED BY public.user_permissions.id;
          public          postgres    false    222            �            1259    16777 
   user_types    TABLE     d   CREATE TABLE public.user_types (
    id character(2) NOT NULL,
    ut_name character varying(30)
);
    DROP TABLE public.user_types;
       public         heap    postgres    false            �            1259    16556    users    TABLE       CREATE TABLE public.users (
    id integer NOT NULL,
    user_typeid character(2),
    user_username character varying(30),
    user_password character varying(100),
    user_firstname character varying(30),
    user_lastname character varying(30),
    user_address character varying(100),
    user_tel character varying(11),
    user_status character varying(10),
    user_date timestamp without time zone,
    user_avatar character varying(100),
    user_email character varying(100),
    user_wardid integer,
    user_isdeleted boolean
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
       public          postgres    false    202            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    201            �            1259    16804    ward    TABLE     �   CREATE TABLE public.ward (
    id integer NOT NULL,
    ward_name character varying(50),
    ward_prefix character varying(20),
    ward_provinceid integer,
    ward_districtid integer
);
    DROP TABLE public.ward;
       public         heap    postgres    false            �           2604    16737    cloth id    DEFAULT     d   ALTER TABLE ONLY public.cloth ALTER COLUMN id SET DEFAULT nextval('public.cloth_id_seq'::regclass);
 7   ALTER TABLE public.cloth ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            �           2604    16987    log id    DEFAULT     `   ALTER TABLE ONLY public.log ALTER COLUMN id SET DEFAULT nextval('public.log_id_seq'::regclass);
 5   ALTER TABLE public.log ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    237    236    237            �           2604    16633    measurements id    DEFAULT     r   ALTER TABLE ONLY public.measurements ALTER COLUMN id SET DEFAULT nextval('public.measurements_id_seq'::regclass);
 >   ALTER TABLE public.measurements ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    207    208            �           2604    16684    order_details id    DEFAULT     t   ALTER TABLE ONLY public.order_details ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);
 ?   ALTER TABLE public.order_details ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            �           2604    16666    order_status id    DEFAULT     r   ALTER TABLE ONLY public.order_status ALTER COLUMN id SET DEFAULT nextval('public.order_status_id_seq'::regclass);
 >   ALTER TABLE public.order_status ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            �           2604    16575    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204    205            �           2604    16877    test id    DEFAULT     b   ALTER TABLE ONLY public.test ALTER COLUMN id SET DEFAULT nextval('public.test_id_seq'::regclass);
 6   ALTER TABLE public.test ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    225    224    225            �           2604    16889    test1 id    DEFAULT     d   ALTER TABLE ONLY public.test1 ALTER COLUMN id SET DEFAULT nextval('public.test1_id_seq'::regclass);
 7   ALTER TABLE public.test1 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    226    227    227            �           2604    16900    test2 id    DEFAULT     d   ALTER TABLE ONLY public.test2 ALTER COLUMN id SET DEFAULT nextval('public.test2_id_seq'::regclass);
 7   ALTER TABLE public.test2 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    228    229    229            �           2604    16921    test3 id    DEFAULT     d   ALTER TABLE ONLY public.test3 ALTER COLUMN id SET DEFAULT nextval('public.test3_id_seq'::regclass);
 7   ALTER TABLE public.test3 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    230    231    231            �           2604    16964    test6 id    DEFAULT     d   ALTER TABLE ONLY public.test6 ALTER COLUMN id SET DEFAULT nextval('public.test6_id_seq'::regclass);
 7   ALTER TABLE public.test6 ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    234    235    235            �           2604    16864    user_permissions id    DEFAULT     z   ALTER TABLE ONLY public.user_permissions ALTER COLUMN id SET DEFAULT nextval('public.user_permissions_id_seq'::regclass);
 B   ALTER TABLE public.user_permissions ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    223    222    223            �           2604    16559    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    202    201    202            �          0    16734    cloth 
   TABLE DATA           �   COPY public.cloth (id, cloth_material, cloth_name, cloth_quantity, cloth_userid, cloth_typeid, cloth_image, cloth_isdeleted) FROM stdin;
    public          postgres    false    217   &�       �          0    17027    cloth_log_detail 
   TABLE DATA           �   COPY public.cloth_log_detail (cld_logid, cld_old_name, cld_new_name, cld_old_quantity, cld_name_quantity, cld_old_typeid, cld_new_typeid) FROM stdin;
    public          postgres    false    241   V�       �          0    16605 
   clothtypes 
   TABLE DATA           1   COPY public.clothtypes (id, ct_name) FROM stdin;
    public          postgres    false    206   �       �          0    16794    district 
   TABLE DATA           [   COPY public.district (id, district_name, district_prefix, district_provinceid) FROM stdin;
    public          postgres    false    220   ��       �          0    16990 	   eventtype 
   TABLE DATA           C   COPY public.eventtype (id, et_name, et_functiontypeid) FROM stdin;
    public          postgres    false    238   ��       �          0    16995    functiontype 
   TABLE DATA           3   COPY public.functiontype (id, ft_name) FROM stdin;
    public          postgres    false    239   �       �          0    17062    giamgia 
   TABLE DATA           9   COPY public.giamgia (id, giam, sudung, ngay) FROM stdin;
    public          postgres    false    243   .      �          0    17067    giftvoucher 
   TABLE DATA           �   COPY public.giftvoucher (id, gv_discription, gv_discount, gv_creationdate, gv_expirationdate, gv_isactivated, gv_userid) FROM stdin;
    public          postgres    false    244         �          0    16984    log 
   TABLE DATA           Y   COPY public.log (id, log_userid, log_eventtypeid, log_date, log_description) FROM stdin;
    public          postgres    false    237   �      �          0    16630    measurements 
   TABLE DATA           
  COPY public.measurements (id, m_userid, m_neckline, m_bust, m_waist, m_buttock, m_shoulderwidth, m_armpitcircumference, m_biceps, m_wristaround, m_sleevelength, m_shirtlength, m_crotchlength, m_thighcircumference, m_dresslength, m_pantslength, m_gender) FROM stdin;
    public          postgres    false    208   �      �          0    16681    order_details 
   TABLE DATA           +  COPY public.order_details (id, od_orderid, od_productid, od_clothid, od_neckline, od_bust, od_waist, od_buttock, od_shoulderwidth, od_armpitcircumference, od_biceps, od_wristaround, od_sleevelength, od_shirtlength, od_crotchlength, od_thighcircumference, od_dresslength, od_pantslength) FROM stdin;
    public          postgres    false    215         �          0    16669    order_paymentmethod 
   TABLE DATA           ;   COPY public.order_paymentmethod (id, opm_name) FROM stdin;
    public          postgres    false    212   �      �          0    16674    order_shippingmethod 
   TABLE DATA           <   COPY public.order_shippingmethod (id, osm_name) FROM stdin;
    public          postgres    false    213   �      �          0    16663    order_status 
   TABLE DATA           3   COPY public.order_status (id, os_name) FROM stdin;
    public          postgres    false    211   0      �          0    16655    orders 
   TABLE DATA           �  COPY public.orders (id, order_customername, order_customeraddress, order_customerphone, order_customeremail, order_startdate, order_enddate, order_subtotal, order_discount, order_total, order_paymentid, order_shippingid, order_statusid, order_userid, order_tailorid, order_processingtime1, order_processingtime2, order_processingtime3, order_processingtime4, order_shippingtime, order_wardid) FROM stdin;
    public          postgres    false    209   �      �          0    17020    product_log_detail 
   TABLE DATA           g  COPY public.product_log_detail (pld_logid, pld_old_typeid, pld_new_typeid, pld_old_name, pld_new_name, pld_old_price, pld_new_price, pld_old_color, pld_new_color, pld_old_material, pld_new_material, pld_old_lining, pld_new_lining, pld_old_size, pld_new_size, pld_old_thickness, pld_new_thickness, pld_old_softness, pld_new_softness, pld_old_elasticity, pld_new_elasticity, pld_old_introduction1, pld_new_introduction1, pld_old_introduction2, pld_new_introduction2, pld_old_introduction3, pld_new_introduction3, pld_old_introduction4, pld_new_introduction4, pld_old_introduction5, pld_new_introduction5) FROM stdin;
    public          postgres    false    240   04      �          0    16572    products 
   TABLE DATA           �  COPY public.products (id, product_code, product_typeid, product_name, product_price, product_old_price, product_color, product_material, product_lining, product_size, product_thickness, product_softness, product_elasticity, product_introduction1, product_introduction2, product_introduction3, product_introduction4, product_introduction5, product_sizeimage, product_image1, product_image2, product_image3, product_isdeleted) FROM stdin;
    public          postgres    false    205   �7      �          0    16565    producttypes 
   TABLE DATA           3   COPY public.producttypes (id, pt_name) FROM stdin;
    public          postgres    false    203   H      �          0    16789    province 
   TABLE DATA           D   COPY public.province (id, province_name, province_code) FROM stdin;
    public          postgres    false    219   hH      �          0    16874    test 
   TABLE DATA           A   COPY public.test (id, test1_id, test2_id, test_text) FROM stdin;
    public          postgres    false    225   LK      �          0    16886    test1 
   TABLE DATA           <   COPY public.test1 (id, test1_text, test1_text2) FROM stdin;
    public          postgres    false    227   �K      �          0    16897    test2 
   TABLE DATA           <   COPY public.test2 (id, test2_text, test2_text2) FROM stdin;
    public          postgres    false    229   �K      �          0    16918    test3 
   TABLE DATA           3   COPY public.test3 (id, text, test6_id) FROM stdin;
    public          postgres    false    231   �K      �          0    16929    test4 
   TABLE DATA           5   COPY public.test4 (test3_id, test4_text) FROM stdin;
    public          postgres    false    232   L      �          0    16945    test5 
   TABLE DATA           5   COPY public.test5 (test3_id, test5_text) FROM stdin;
    public          postgres    false    233   7L      �          0    16961    test6 
   TABLE DATA           /   COPY public.test6 (id, test6_name) FROM stdin;
    public          postgres    false    235   bL      �          0    17040    user_log_detail 
   TABLE DATA             COPY public.user_log_detail (uld_logid, uld_old_firstname, uld_new_firstname, uld_old_lastname, uld_new_lastname, uld_old_address, uld_new_address, uld_old_tel, uld_new_tel, uld_old_email, uld_new_email, uld_old_wardid, uld_new_wardid, uld_old_status, uld_new_status) FROM stdin;
    public          postgres    false    242   �L      �          0    16861    user_permissions 
   TABLE DATA           �   COPY public.user_permissions (id, up_userid, up_eccommercedashboard, up_orderdashboard, up_customeraccountmanager, up_staffaccountmanager, up_productmanager, up_clothmanager, up_ordermanager) FROM stdin;
    public          postgres    false    223   ZM      �          0    16777 
   user_types 
   TABLE DATA           1   COPY public.user_types (id, ut_name) FROM stdin;
    public          postgres    false    218   �M      �          0    16556    users 
   TABLE DATA           �   COPY public.users (id, user_typeid, user_username, user_password, user_firstname, user_lastname, user_address, user_tel, user_status, user_date, user_avatar, user_email, user_wardid, user_isdeleted) FROM stdin;
    public          postgres    false    202   �M      �          0    16804    ward 
   TABLE DATA           \   COPY public.ward (id, ward_name, ward_prefix, ward_provinceid, ward_districtid) FROM stdin;
    public          postgres    false    221   iY      �           0    0    cloth_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.cloth_id_seq', 1, false);
          public          postgres    false    216            �           0    0 
   log_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.log_id_seq', 48, true);
          public          postgres    false    236            �           0    0    measurements_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.measurements_id_seq', 23, true);
          public          postgres    false    207            �           0    0    order_details_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.order_details_id_seq', 130, true);
          public          postgres    false    214            �           0    0    order_status_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.order_status_id_seq', 9, true);
          public          postgres    false    210            �           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 16, true);
          public          postgres    false    204            �           0    0    test1_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test1_id_seq', 1, true);
          public          postgres    false    226            �           0    0    test2_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test2_id_seq', 1, true);
          public          postgres    false    228            �           0    0    test3_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test3_id_seq', 2, true);
          public          postgres    false    230            �           0    0    test6_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.test6_id_seq', 1, true);
          public          postgres    false    234            �           0    0    test_id_seq    SEQUENCE SET     9   SELECT pg_catalog.setval('public.test_id_seq', 5, true);
          public          postgres    false    224            �           0    0    user_permissions_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.user_permissions_id_seq', 8, true);
          public          postgres    false    222            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 26, true);
          public          postgres    false    201            �           2606    16739    cloth cloth_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT cloth_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT cloth_pkey;
       public            postgres    false    217            �           2606    16609    clothtypes clothtypes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.clothtypes
    ADD CONSTRAINT clothtypes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.clothtypes DROP CONSTRAINT clothtypes_pkey;
       public            postgres    false    206            �           2606    16798    district district_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.district
    ADD CONSTRAINT district_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT district_pkey;
       public            postgres    false    220            �           2606    16994    eventtype eventtype_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.eventtype
    ADD CONSTRAINT eventtype_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.eventtype DROP CONSTRAINT eventtype_pkey;
       public            postgres    false    238                        2606    16999    functiontype functiontype_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.functiontype
    ADD CONSTRAINT functiontype_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.functiontype DROP CONSTRAINT functiontype_pkey;
       public            postgres    false    239                       2606    17066    giamgia giamgia_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.giamgia
    ADD CONSTRAINT giamgia_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.giamgia DROP CONSTRAINT giamgia_pkey;
       public            postgres    false    243                       2606    17071    giftvoucher giftvoucher_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.giftvoucher
    ADD CONSTRAINT giftvoucher_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.giftvoucher DROP CONSTRAINT giftvoucher_pkey;
       public            postgres    false    244            �           2606    16989    log log_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.log
    ADD CONSTRAINT log_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.log DROP CONSTRAINT log_pkey;
       public            postgres    false    237            �           2606    16635    measurements measurements_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT measurements_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.measurements DROP CONSTRAINT measurements_pkey;
       public            postgres    false    208            �           2606    16686     order_details order_details_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.order_details DROP CONSTRAINT order_details_pkey;
       public            postgres    false    215            �           2606    16673 ,   order_paymentmethod order_paymentmethod_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.order_paymentmethod
    ADD CONSTRAINT order_paymentmethod_pkey PRIMARY KEY (id);
 V   ALTER TABLE ONLY public.order_paymentmethod DROP CONSTRAINT order_paymentmethod_pkey;
       public            postgres    false    212            �           2606    16678 .   order_shippingmethod order_shippingmethod_pkey 
   CONSTRAINT     l   ALTER TABLE ONLY public.order_shippingmethod
    ADD CONSTRAINT order_shippingmethod_pkey PRIMARY KEY (id);
 X   ALTER TABLE ONLY public.order_shippingmethod DROP CONSTRAINT order_shippingmethod_pkey;
       public            postgres    false    213            �           2606    16668    order_status order_status_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.order_status
    ADD CONSTRAINT order_status_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.order_status DROP CONSTRAINT order_status_pkey;
       public            postgres    false    211            �           2606    16659    orders orders_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    209            �           2606    16580    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    205            �           2606    16569    producttypes producttypes_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.producttypes
    ADD CONSTRAINT producttypes_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.producttypes DROP CONSTRAINT producttypes_pkey;
       public            postgres    false    203            �           2606    16793    province province_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.province
    ADD CONSTRAINT province_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.province DROP CONSTRAINT province_pkey;
       public            postgres    false    219            �           2606    16894    test1 test1_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test1
    ADD CONSTRAINT test1_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test1 DROP CONSTRAINT test1_pkey;
       public            postgres    false    227            �           2606    16905    test2 test2_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test2
    ADD CONSTRAINT test2_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test2 DROP CONSTRAINT test2_pkey;
       public            postgres    false    229            �           2606    16926    test3 test3_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test3
    ADD CONSTRAINT test3_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test3 DROP CONSTRAINT test3_pkey;
       public            postgres    false    231            �           2606    16969    test6 test6_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.test6
    ADD CONSTRAINT test6_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.test6 DROP CONSTRAINT test6_pkey;
       public            postgres    false    235            �           2606    16882    test test_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.test
    ADD CONSTRAINT test_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.test DROP CONSTRAINT test_pkey;
       public            postgres    false    225            �           2606    16866 &   user_permissions user_permissions_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT user_permissions_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.user_permissions DROP CONSTRAINT user_permissions_pkey;
       public            postgres    false    223            �           2606    16781    user_types user_types_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.user_types
    ADD CONSTRAINT user_types_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.user_types DROP CONSTRAINT user_types_pkey;
       public            postgres    false    218            �           2606    16564    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    202            �           2606    16808    ward ward_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.ward
    ADD CONSTRAINT ward_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.ward DROP CONSTRAINT ward_pkey;
       public            postgres    false    221                       2606    16750    order_details FK_CLOTH    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_CLOTH" FOREIGN KEY (od_clothid) REFERENCES public.cloth(id) NOT VALID;
 B   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_CLOTH";
       public          postgres    false    215    217    3046                       2606    16740    cloth FK_CLOTHTYPES    FK CONSTRAINT     ~   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_CLOTHTYPES" FOREIGN KEY (cloth_typeid) REFERENCES public.clothtypes(id);
 ?   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_CLOTHTYPES";
       public          postgres    false    206    3032    217                       2606    16814    ward FK_DISTRICTID    FK CONSTRAINT     �   ALTER TABLE ONLY public.ward
    ADD CONSTRAINT "FK_DISTRICTID" FOREIGN KEY (ward_districtid) REFERENCES public.district(id) NOT VALID;
 >   ALTER TABLE ONLY public.ward DROP CONSTRAINT "FK_DISTRICTID";
       public          postgres    false    220    221    3052                       2606    17015    log FK_EVENTTYPE    FK CONSTRAINT     �   ALTER TABLE ONLY public.log
    ADD CONSTRAINT "FK_EVENTTYPE" FOREIGN KEY (log_eventtypeid) REFERENCES public.eventtype(id) NOT VALID;
 <   ALTER TABLE ONLY public.log DROP CONSTRAINT "FK_EVENTTYPE";
       public          postgres    false    238    237    3070                       2606    17005    eventtype FK_FUNCTIONTYPEID    FK CONSTRAINT     �   ALTER TABLE ONLY public.eventtype
    ADD CONSTRAINT "FK_FUNCTIONTYPEID" FOREIGN KEY (et_functiontypeid) REFERENCES public.functiontype(id) NOT VALID;
 G   ALTER TABLE ONLY public.eventtype DROP CONSTRAINT "FK_FUNCTIONTYPEID";
       public          postgres    false    239    3072    238                        2606    17030    product_log_detail FK_LOG    FK CONSTRAINT     �   ALTER TABLE ONLY public.product_log_detail
    ADD CONSTRAINT "FK_LOG" FOREIGN KEY (pld_logid) REFERENCES public.log(id) NOT VALID;
 E   ALTER TABLE ONLY public.product_log_detail DROP CONSTRAINT "FK_LOG";
       public          postgres    false    237    3068    240            !           2606    17035    cloth_log_detail FK_LOG    FK CONSTRAINT     �   ALTER TABLE ONLY public.cloth_log_detail
    ADD CONSTRAINT "FK_LOG" FOREIGN KEY (cld_logid) REFERENCES public.log(id) NOT VALID;
 C   ALTER TABLE ONLY public.cloth_log_detail DROP CONSTRAINT "FK_LOG";
       public          postgres    false    241    237    3068            "           2606    17046    user_log_detail FK_LOG    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_log_detail
    ADD CONSTRAINT "FK_LOG" FOREIGN KEY (uld_logid) REFERENCES public.log(id) NOT VALID;
 B   ALTER TABLE ONLY public.user_log_detail DROP CONSTRAINT "FK_LOG";
       public          postgres    false    242    237    3068            #           2606    17051    user_log_detail FK_NEWWARD    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_log_detail
    ADD CONSTRAINT "FK_NEWWARD" FOREIGN KEY (uld_new_wardid) REFERENCES public.ward(id) NOT VALID;
 F   ALTER TABLE ONLY public.user_log_detail DROP CONSTRAINT "FK_NEWWARD";
       public          postgres    false    3054    221    242            $           2606    17056    user_log_detail FK_OLDWARD    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_log_detail
    ADD CONSTRAINT "FK_OLDWARD" FOREIGN KEY (uld_old_wardid) REFERENCES public.ward(id) NOT VALID;
 F   ALTER TABLE ONLY public.user_log_detail DROP CONSTRAINT "FK_OLDWARD";
       public          postgres    false    242    3054    221                       2606    16727    order_details FK_ORDERS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_ORDERS" FOREIGN KEY (od_orderid) REFERENCES public.orders(id) NOT VALID;
 C   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_ORDERS";
       public          postgres    false    3036    209    215                       2606    16755    orders FK_ORDERSTATUS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_ORDERSTATUS" FOREIGN KEY (order_statusid) REFERENCES public.order_status(id) NOT VALID;
 A   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_ORDERSTATUS";
       public          postgres    false    3038    209    211            	           2606    16687    orders FK_PAYMENTMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_PAYMENTMETHOD" FOREIGN KEY (order_paymentid) REFERENCES public.order_paymentmethod(id) NOT VALID;
 C   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_PAYMENTMETHOD";
       public          postgres    false    209    212    3040                       2606    16722    order_details FK_PRODUCTS    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_details
    ADD CONSTRAINT "FK_PRODUCTS" FOREIGN KEY (od_productid) REFERENCES public.products(id) NOT VALID;
 E   ALTER TABLE ONLY public.order_details DROP CONSTRAINT "FK_PRODUCTS";
       public          postgres    false    205    3030    215                       2606    16595    products FK_PRODUCTTYPES    FK CONSTRAINT     �   ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_PRODUCTTYPES" FOREIGN KEY (product_typeid) REFERENCES public.producttypes(id) NOT VALID;
 D   ALTER TABLE ONLY public.products DROP CONSTRAINT "FK_PRODUCTTYPES";
       public          postgres    false    205    203    3028                       2606    16799    district FK_PROVINCE    FK CONSTRAINT     �   ALTER TABLE ONLY public.district
    ADD CONSTRAINT "FK_PROVINCE" FOREIGN KEY (district_provinceid) REFERENCES public.province(id) NOT VALID;
 @   ALTER TABLE ONLY public.district DROP CONSTRAINT "FK_PROVINCE";
       public          postgres    false    219    220    3050                       2606    16809    ward FK_PROVINCEID    FK CONSTRAINT     �   ALTER TABLE ONLY public.ward
    ADD CONSTRAINT "FK_PROVINCEID" FOREIGN KEY (ward_provinceid) REFERENCES public.province(id) NOT VALID;
 >   ALTER TABLE ONLY public.ward DROP CONSTRAINT "FK_PROVINCEID";
       public          postgres    false    3050    221    219            
           2606    16692    orders FK_SHIPPINGMETHOD    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_SHIPPINGMETHOD" FOREIGN KEY (order_shippingid) REFERENCES public.order_shippingmethod(id) NOT VALID;
 D   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_SHIPPINGMETHOD";
       public          postgres    false    209    3042    213                       2606    16760    orders FK_TAILORS    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_TAILORS" FOREIGN KEY (order_tailorid) REFERENCES public.users(id) NOT VALID;
 =   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_TAILORS";
       public          postgres    false    3026    209    202                       2606    17010    log FK_USER    FK CONSTRAINT     y   ALTER TABLE ONLY public.log
    ADD CONSTRAINT "FK_USER" FOREIGN KEY (log_userid) REFERENCES public.users(id) NOT VALID;
 7   ALTER TABLE ONLY public.log DROP CONSTRAINT "FK_USER";
       public          postgres    false    3026    202    237                       2606    16697    orders FK_USERS    FK CONSTRAINT        ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (order_userid) REFERENCES public.users(id) NOT VALID;
 ;   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_USERS";
       public          postgres    false    209    202    3026                       2606    16745    cloth FK_USERS    FK CONSTRAINT     t   ALTER TABLE ONLY public.cloth
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (cloth_userid) REFERENCES public.users(id);
 :   ALTER TABLE ONLY public.cloth DROP CONSTRAINT "FK_USERS";
       public          postgres    false    202    3026    217            %           2606    17072    giftvoucher FK_USERS    FK CONSTRAINT     �   ALTER TABLE ONLY public.giftvoucher
    ADD CONSTRAINT "FK_USERS" FOREIGN KEY (gv_userid) REFERENCES public.users(id) NOT VALID;
 @   ALTER TABLE ONLY public.giftvoucher DROP CONSTRAINT "FK_USERS";
       public          postgres    false    3026    244    202                       2606    16782    users FK_USERTYPES    FK CONSTRAINT     �   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_USERTYPES" FOREIGN KEY (user_typeid) REFERENCES public.user_types(id) NOT VALID;
 >   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_USERTYPES";
       public          postgres    false    202    218    3048                       2606    16825    users FK_WARD    FK CONSTRAINT     {   ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_WARD" FOREIGN KEY (user_wardid) REFERENCES public.ward(id) NOT VALID;
 9   ALTER TABLE ONLY public.users DROP CONSTRAINT "FK_WARD";
       public          postgres    false    202    221    3054                       2606    16830    orders FK_WARD    FK CONSTRAINT     }   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_WARD" FOREIGN KEY (order_wardid) REFERENCES public.ward(id) NOT VALID;
 :   ALTER TABLE ONLY public.orders DROP CONSTRAINT "FK_WARD";
       public          postgres    false    209    3054    221                       2606    16636    measurements FK_users    FK CONSTRAINT     �   ALTER TABLE ONLY public.measurements
    ADD CONSTRAINT "FK_users" FOREIGN KEY (m_userid) REFERENCES public.users(id) NOT VALID;
 A   ALTER TABLE ONLY public.measurements DROP CONSTRAINT "FK_users";
       public          postgres    false    208    3026    202                       2606    16867    user_permissions PK_USERID    FK CONSTRAINT     �   ALTER TABLE ONLY public.user_permissions
    ADD CONSTRAINT "PK_USERID" FOREIGN KEY (up_userid) REFERENCES public.users(id) NOT VALID;
 F   ALTER TABLE ONLY public.user_permissions DROP CONSTRAINT "PK_USERID";
       public          postgres    false    223    3026    202                       2606    16906    test test1_FK    FK CONSTRAINT     y   ALTER TABLE ONLY public.test
    ADD CONSTRAINT "test1_FK" FOREIGN KEY (test1_id) REFERENCES public.test1(id) NOT VALID;
 9   ALTER TABLE ONLY public.test DROP CONSTRAINT "test1_FK";
       public          postgres    false    227    3060    225                       2606    16911    test test2_FK    FK CONSTRAINT     y   ALTER TABLE ONLY public.test
    ADD CONSTRAINT "test2_FK" FOREIGN KEY (test2_id) REFERENCES public.test2(id) NOT VALID;
 9   ALTER TABLE ONLY public.test DROP CONSTRAINT "test2_FK";
       public          postgres    false    3062    229    225                       2606    16938    test4 test3_FK    FK CONSTRAINT     p   ALTER TABLE ONLY public.test4
    ADD CONSTRAINT "test3_FK" FOREIGN KEY (test3_id) REFERENCES public.test3(id);
 :   ALTER TABLE ONLY public.test4 DROP CONSTRAINT "test3_FK";
       public          postgres    false    232    3064    231                       2606    16954    test5 test3_FK    FK CONSTRAINT     z   ALTER TABLE ONLY public.test5
    ADD CONSTRAINT "test3_FK" FOREIGN KEY (test3_id) REFERENCES public.test3(id) NOT VALID;
 :   ALTER TABLE ONLY public.test5 DROP CONSTRAINT "test3_FK";
       public          postgres    false    231    233    3064                       2606    16970    test3 test_FK    FK CONSTRAINT     y   ALTER TABLE ONLY public.test3
    ADD CONSTRAINT "test_FK" FOREIGN KEY (test6_id) REFERENCES public.test6(id) NOT VALID;
 9   ALTER TABLE ONLY public.test3 DROP CONSTRAINT "test_FK";
       public          postgres    false    231    3066    235            �      x��Y�n�6]+_��Z �9$E���"@
ܢ���l�RK�-�Q]t(
�v�n�E.�����$˖��{�	%��9s���/�Ct��[���1�z��h�]"�y���S�ɸM��4q����� ��>��{/4�W}�����;���(������L��y�O��/�S/}�03��� ��u�qfq��������34I6��T�d�Z��G�y�B`����/?9Ƣ����B���jeN#s��V)��/,0�8�qc�F*�����'�����@q����Q�l~�ؐ�) �_\_���0LB�Gņ�fx�F�I�~%i^b_�T|��|�yI_�`Pa���ʋ�_9	j�.Z-Ud�f�� ����Wh�1lA� �lP���~6�R�A��)�D�f�Lj6���!r$͖u��}3O��98���\�O�<��	�`C��`��4̷�W(^$��]���0��I�sʰL�P,f�WQ�y�7^)�=�Kǅ��o���"i��!���$OTx>b @�x�,x�5�ڊ�6�`�����2�� y�	9 q6 ��� ))�ұk���@���*5��EE�Y�V��vB��nk��DX�e;J��	���Ű��t��b��3T�KD�*�#
20HD�?�r#�a�r�I�SV�T$���]�yJ���Uw���J2I���t?�l[!u��<�֤�=
��
��	��@H���a�$��'h*� �!�8�5���I9�E��O[{Oɕ�^�4
�����|�����]�Քc�]��c�ص 9�'v�ݜ�"$��&�����nrDZ�b-����:'�Z@u,�A�ݡ���j�E(�^�t��v���XH3!�"���e496ʞ��Gj'��<z��tSVT�U�c+<ֳ⡢��Pg��6�%%T�T=�� q�D�O��I2(g;<�Q���xl����'��,�����H��2���w�z�������*%o�d�S����~ܾV7k){��s��t�f�m��mۈɖ�-E���ە"H�9ר��-:\�;��m1���G�B��/��0�!�J��cr&d����G~*����nRB1�孾���X������k?c��j��8 tup��]mB��r�=o��aq0�,�P	�::~��M����͹ e��rag�t.�33��G!�&��w�;�������g��W% �E���'�>'@������^�[�{� �CX/AH�"�wD-)���;Jx�a�<+O��{5�!��ˬ(�6f�$����W3&���^���Х�Wh2��F�3\��      �   �   x�34�{�kq�BrbQ�BN��]3�*�2�LL�# khj�id`����&�-�Z
�s*S�KR�R��ro�KWH~�{u)P����
E�6<ܽ��D�
���@Aֆ���	.c�9 G*�d>ܵ�D!���K3��MF�~5����!`�+F��� ¤{�      �   r   x�sv��{�kq�BrbQ>WX���_��S�Z\�Z�������k�BI��]�K2���P�x��7�+���&;���d���y�
�w���
��Y��p�n�b��=... �7�      �      x�u�]kǚǯ[���|���{��%-֮FZ�R�{3� ���e�,�%�s�^�`�"���"���!�u�=����WUO=���_WwU�S�k��h�}39�7Nڋ�I�5{���e%k����������k=Y���������$~0^�_y�)�}�Zn?���A�.>\�^=Yޡ���_����Ļ��vO��x���kl����6�=1}�[$��8��3�~�;�~�u�S���o�p?3�,�Ϝ?+������,��q?+�L��������4�*�\��l��4c�^k��˒�}��_y���G���$]KK��o�哶*Z_��|,�?��q��ס曜�M�^=�@m�||��br�,��f����F���b~99�Y"L��q|ߓ/iO#��� �|L�Eƣx�~�_��t���N��E�5��g�*TF[��|��ɻWE2��e�zS�jd~����Dé4��BM��� �i��S�ʓ��j�F��ӕK�gF�͞�	^����m��(��G��~{�c��[�-���(=_���^��g��b�7o<M��}d���S�V�@�H4�~p���3%jEj��<="�"��W���?�"���}�}7�ۡKn�O�4�[ek������*������Nd�ɣ4w/y�7�K����Z̟{�)���?�e4�2��%va��s��Mz����k��<�AZ��ke����<��x�!E�ɽx I՝�h��Z���PIz0n/��յQ%�+���*��ܗz^�QU���Uq;�wtpµy"_D�Z���Ԅ�g��_˥��ZOB�f�m3���� ��O)���>��GU_uJk�C��j�&+!���>��z�D�wװ�����ID��8�<�L_v��`�Z�������KPmr1��RD�M�h��O*Y���	�>|�XSQW5�ٻ���r�����ǻc��&��O�Mc��j�I�>l/�~c	�>ᛔ!�P\����o/(-S[N�E��/-������ղ��x��uK�DT�uy2�f,����x�AE�Cͨ.�؏��"�r�W�dfw=�w��j;Η.k�V0V�d��2&��j��2.����_w��5~�a�9g3%�`��7��%(DƊiE�td]죴[@+O���g��/q�_�=s�e��<�*ڢ����8o�GVȦ�_)PG����6Ŀ?)�:-���r֙�,%�F��b� ��1~Q2ʝ�$���0 1�g��  Fw{:`����҂��J�j��ҟ��z���H ���q(H ����A;�#���_��>a��m/��f��Ɲ�MG\�����To�A�v��(��d�E�}��$V؍,8Y"*�=6���DF$����_5ˌ��`|5�,w��V�H��?��G���������`�	��HU؅X�����7w�Ʋ14'3�5��E�$��m�=������{ǣ3��_F�ֽ�Sݞ�};�:G�~{�D7��<���H�ґu�U���&�#�������qx�\�K�ŝ{wߞ��S��w�&<�:I�x�ؑ.����9,0�~�Hi��6�k��TQ�wz����ϕ	h�勧�.���UNY�z���K��L���S�m���<sfG]D�OM�B���Ů�7�+J}��=ͫh8���4cqFؐ0w���Y zh���Ky Z�k��F�|�$�:�=��'��L�̍S=�������p���y�����~�f�N�ŗ���F:�W=F��s4`��	��]pWwM#��3ݞE��!�7�B�
�J0]��X���p�r���ǁU4�6=��'��Mdi�@H*~(�
^	L��r����u-��gh�Q���j�hGW�2B�~�C�X�	��f��n���1B�.P�hݘL/0J��3�TQb�0�@�v�L�FY��$��Y ����T�k}�����ly�)?�t�7�B�������@34���^{>V������4H��=|����{6g�]���wy�(�OI).�7D�{�����/�VfU6I�'�.�� ��C�t��n���`�a�����8ED�@��Ď��f&[�`L� ��h��U3��E�Q��Vڵ�*���(7����!d�Aq�n�HσM��T�T����^(Xb߁Ux�_�Sy�D���g3_ r,��,Th@�]���_����.�R,,2�A Uю�K�SP���ъ�I�r,����w=�Jwe�b&�4I1�JER�l0y�j�IREn@ot�R0�Z���)�+�WQy�Y��Ak�v�X�@�a�>��[��oVL�L�L�
,j��N��G���zK ��ё}9�:�&
5+ň��t ��J��xc��/	2�����o�F���&6o�w��*�Y��/�{���@/�C�EZ����:�(D�O��I	rw=Zի��@�i"�d+��X$�����Ax_��n��P2W 1� �H�YAu�$�Sl��u��G,�n�x�Fr��ATY3�i"��*P��17vc�Yo
��ee�J���Z7v=N\��io� "!p,T	��H�~�g�	
���%ުS�T�0��Y��M��#��:��7��?��K0
A�ja�w��2@j�Ƿ�ؗ�����{:� A�"��l��H�Ғ��T.��I���yg~Y�����ᑮ����5V��l�I��	��d���޽L�/6
{�Y�}��8�r=d��5U��4�M�¤�c�Ԗ�m�hҐ@�wİk�"��K �`&C� �5�Ҏ=B�6�8�������J�y�-�S�$�Y�0!+�y�#�h��䗽ri��2l����h�d
(Saـ[�|��ևe[N5`��>�Od�P����	���I��A
Ct�*I]��zu�����,����V�e�wӀ~�6�}?��N]
 ��3{+�@s����=�����&+����'�V��I���P�R��B�`�ooTa]P1XZ�A9���ȣ���7��;fK��s��ԯh�~��!�J#�'�`�����g׎�kظPBWO�j-���2e� WH
�dҴ�I�N�
af}H�ɀ�3w���+�Cd�J$�f�v՛���W�]qF�h j����z���-u�2����YjN$�t�=P��NQ$����㛨0h��[H�)"��h�����$u��1�5V�1��Q������&��
� �I�>�,	b^��K���b�{��!yWM�n�zO�^U�1Hs��^y
 �q*�ׯIV+��*��%�'[OT�N��?�#�Y��(�yNY�T�HV�����$�0"��7֧	��Y���E�/�mX�abOO=��F2�&�HC/�D���T�Hr�0&!r��歨��	b+%Z~Hjw0hq�z)tΞ}�l&ީ;!��o ��"�����V<Un�Uw��#xq �/��B�� ��\��Q�a����7�e�����b�5�c)�H�/���5�� �Jb�a�,�ZjBg`\@�t\!��&��n�����7�Y.�� H���` k��@�|?�}. qQ���F�,�n�a��d������q:�y�<z4F�xß- K�PAf� w��	E�*��������;��w��_t�|�*�E!K"�CGDit(��'u&�d�tXw�J�<j_��̣x�iVJ���>��Y
�f���?V�i"���o��c�	��@Q�-�V`i���=n/Cq���I�L�=���*PX�s�D���*��i9�o�Q��Rlf�I��>�ĲZ�ˁջg_�M��0*J�L?���2k��*�C�w�4���S�����9xNĥ�}O���;i���9�ko=�PK{m"u�@�qHIv�_��Ĵ?�7�~�R��{73��K��'X����3�	�B)%D;-�E�FXe·� 8!�]Ai��6�D]�=?�7D�)P\�~}�UN@w�#05`���IL��^���o��.ವ�¨H>R�����2Nߖ_�"�M6J���&]=l �H��ڿOt{���rqjO,����C��D�!T�#c�\04Pj��8<E:h�L�tE�A\[��T~��Ѐ F  �qՂs��
�DMb�X�����Az���,}��ve�X��E��w88�*��I�(EP�L"� �Vq��*�'�Ѽ^T��&�����U@�G�}�m<Y��N~5��x�y�^�$�[s�_-7I�I�͇�؝Ğ}�%(�L���C>�/�	;��	����`����V2L���}M�} �_w.�˔����j��+w�6��Y��{� XZ��D�����WS��հ��a ���6A�Ʋ_!(��V}���L�ck����=Qk���-���`����@� �v��f^
CZ#<�OPw��w:d�����PdK����W�t'��� K;���V�����#F`�����]Źשb6
�X����k�\	�D�
Vt��������8^�_uO��m�5"2�q|�]`;�F����}�A�PGv��Q8�r�����-��}`K����z�,?�M�ka8m,ᐬɦ�����V>'���(�� �yఽ0��� B9����S*�=���NZ����b}�;7�'���J�N:%�����/�El���(Q�,�O��m���˂�uL'�ޗ�僔$�?=Ӡ8������I��I���Zߏ�HEX.�S�d���'�����p�t����X�'P�B9^A�К&�Ti�r ����������»6�++Qh�vq�x�t��A��/���#�|4/H���<�;0\ө>���ܦ*���J�3��fǞK�"�ދ��4:�NX;�7�q,�ꓮ�⢚/{��*Ab���(�󉀖,����$�YFy>��1Ѭ0AÆ�`�^������#���b�}M����kD|�90j��_�#K�A\�!Z��@I���ڞ"�c�ֻ(�	>��)r!����9�K�ŔVuD�鸑F�	��i�ʙ�>���J�q~�	�X�pGVHuJ�}��z�D���z��7��YIl�iE��|Gh���1«nk����V��(hW�'�d�7��EDIp�@�ty�-VV��k)��4����y���\��'��&�~���o�f�cEv5Y����k� 5���6�]�y%MUk	=o;P����|��`���n �b���Bsi�7,ѐUΒ�U��f�z�4�/�TlR�ke1�0���$���I0\�.w�����.ْ"�0���e�ŒJ�t����&;�4�S��ź�8��~i�L�LiN���K�E�V������3B`�����D��~Cq���D(ü	�@n�8a���X�9<�96���"��{ �^�.Ԡ1��
*x�@�\�����Ψ���CU�'��)���Ir��Dd�1O��l;i��]���Q�5�ڮӎ�����1Ճ��<�s�d	�G+H��9�,�F��=��0�_��J�$���`�/4*xp;�T��4v=����Q{��U��Cb����� ���e�8:����6wx��&�KzY
_��J�� Y�� N�J�F������$e���l��O5����Ԃ���ԫ>m#1�d����֪��~��$�H���5�5l/-��,������|�U�;��V
���H�8T^\	#amݡ�� y���)�l�?�ymm����d�      �   �   x�u�1
�0�99EN�^� �B,8���H��:x�*n��`ƞ���?���n��?�Qa����Z���(��#Ҟå���Ὃ�A�i�G�I���c���dt444CcC0�IrC�`�� 4.�En�9�8�;�[��.�>q1y�s�;K�Eu��R{����ī%��[�&��MB�.��z;�R� �.��      �   i   x�p�,}�kq�B��
�`VA��]+s��Q�ʀ�L.�#�-�S�8� /���Y����L��|�@^��w��TH9��2�ʌË��2������� ��I�      �   A   x�KLJ�4�,�4202�54�56P02�2�"���4NC�4�����B��<��!i�"���� d�'      �   N  x���ˎ�X�q�SԤ�v؛;3PJo���N��E�o���i?I�Is��*��h��Ą�'.���ڜ[�T�2�GiZ�P9���Tځ�����u���� �� �"  ��F3��
� ��t�y�^�k,�j��T��L�h��e�Ǝp�N����M����m�����n#�~^���PCl�$#�&�Ÿ0�~l��n$$�*l�-��$�Zܮ¿G��-ʁ-�aU蘿H'l�6���̓)ņ��2e�$h*������=%�ak��l�X�e��Y���y	�`KQ�¯��
�q��Ɂ�3[���"���6�l�\cp�����~��x�H����Pn�:b_v:�Ş{8����I,��ԗ��M�Y�&s��uQ�b��ed<H8�9G+ʞ��6� ���g	�K�\�Ӛ`���5r�	`XO�������+��Q�ۜ<M7B_v8,��N%�m�ǽ������2���]�a�:�2��Ä��5����2x�;R�oF��=s��ݚ$�zl��WKޒ�qq�����&��L_ǒP�U@4)ԟ������n���f���1[ZR�r��M1�mo��I8�iaC�Y�~�W��65���J��6��h���32�۽�����}��K{-O,�usof����>^����_�U�$���Sk��惬*�c_v-�8��n�ҵ5�Tp''7k��Ӯ׎��53k��#�vm�v����4�S�P!PE�f[U۟og�fNP���ǳ�걂t&%�H�&�TVi4Jڗ��j,U�D�B��v�aL��k��ݲ�;C8��R���o����$��6�����}C�e	ǥ![!ڗ�q*k��|֞�`'ikx~l��>��򍘉��eo ����7m��v� �.m�@��v8��0n���B�/[����s�|Q�a:*�8~|ͣ8�|�F_�
�{��- 	]�*?���������rP��`�е��k�dЏ\�'*1iL r �|��y����k[�DޱOe��Qb����v�`�ͣ�-�hQ�;�Ul�~��� ��VH���VM���b�;���>7��k������)��	���³��ڧŵ3��VX̓s_�����8�s-�&� }?��ϗ_��M=͝�37���ݦF}ـ�(/�y����������@�[-3�cS�Ě����}��(��x��(MOg��#���3U����61{�����5���|?%�p�]g�,	U�v9E�����^��t{l������Q�[�~?g��d��¼E��e��.��)�ù�T�̨u{�,�t����V��;�ox���p,q%����=�<}��pbE�����sb���0��K��9������� c��3      �   �  x����jG���OQC.Su�ԭ!Yr�	���1�tWwkI3Bj	�	L!x�U�0!���Ec��&9�#�s鶥$Ћ����T�u.5r w~: �K���TKz��f��x���o���?�۬�釳�c�?l�~�c��	ts ��Z��q)�9��<	�}(u�%]�4��VP:�G�����tYf�{[�&�'��}BL���u}*��O��?�'�����x�H$ŵT�U��tT���XSi��|1�������w�u[�f�ك�!R���\��HA�`�S�	!G,d�;i�NG���|����m��gZ�`��ݓ�.n2�7���0L˛�>�g�|�q"c^n�/§x~B��N����8��XqK.E�_�"���k���_6d���

�v[�C3��h!0�;\
��k���dL����Z��R�Kic-Ro4K9w��"����o�#Fk)����k6n�ߎ�ښ���]��د�)2)SaS�?���5��~����L_Q*͗�~���͍�� �������Ո���R�Մ�s0�e�X�v�ϓ��p-��8��KH���]����f�}ԭ"v�Gy5�8��:���l]_�!\��'y[��V�ڧJul`g8��զO��C=,޵Aj{-�~qtr^���1�o��U*d���>'su4-���.1�^�J�'BG���Kہ�^ɶhW��D�b�.;p��C��6���"�{�_�K�0�>:�hj���ѳ�4��l�+"WL���|��%t\��"у�G��/ֺ�����1k�*7%8�8��qDa�CSr���ȪC�t'0���2�\�,8V^�L�k�UA���^g��U����E��� M��/�4J#`�D�L��U�����I3}Q�3��W�j�*�+t\�Rp��Y�V��JV�D��&lc��
w���?��Jo���0�,�]�},.X�W79_��W��MT�,��e�W��x��M�!�ȍ�E7��I�GZK�ˊ; �V�{%����B�-E���l��%�}���2:r��"lQ�JC	B�fF�s/}���R�֜Y�+����U7��Kw���-�\��W���2��J��"w6A�#S��#�Lk6��"#��>Xų��h_9Md�:��,�	��)5����r�4k�qm���<���T�J4�|��(K^U��@�mURv��k/�
�%{*l��`Ю3K9�+n
YZTAS;I�u�1E�KV�/C�e�O�"r�_@E�9�B[�%_�J��5/�!      �     x��TKn�0\��T����.�t�j�-p���TY�	ff0��p�HȺS�uaVc��b�����<P�z��Y�.L�J)v�  %P]q_��Wx�]��Y	��`"�E��L�^)�vhu8�_���Z��S��)�g��iV�C���He�8�.;�WI�ID6n���=���'�6��Py�:[s���P8[�w�f������0��B�b���ؔh�� ֌Ӑ��m�>��hd���K#���8��Nz�5�Mkw`�]ʽoN���"�[������v��z�G      �   l  x���[r��D���`^{�<���9Q$�o��1f]c�%�������;2��)���#����[j��sd�ت��K.jp1��?��]�+�����_�����������۷5���v�~���6���*ɏ��v�kuK,��3��lqs�]3w��y?�L��Ag�G�]}[ݨ#����C(BɁu�����z[Ϭ�ׯ�ǟ�?�n _��}�6�j�1&�et�,�����wߖ�n����;=W��ѯ�`�j;!��;�ةR�Ax�koo+ƣ���g����c�{�p��m{�����_����/��n߹uЪ�jd�~�}:1�z�Ik?�XwzҖo���lX%x9��Z�
YY�36��$���*>h�^o��������֗�6~l_� U'%�(r٦(p�����C9̚?���~T��k�>��+f'�O�?���^Sξ�|-���	�D[�����r��EO�P�Z��,�g��:�Hح݇����.�A]���|)Qϙ]���K���#.���UW����ǩ!���7hP�q���CAgt���V��	W�Qۯ�}ܐ�%�E��
�5q���WC������.tw�-Iz��D�ʁ�g�]�]�ϋԙ6<^	��Q���*�Uaͻ)�k���%��j�|�_�ї>���.���>׀��X�(�|�>�Sn�㛔oמ?�y�z���9��c�.�CQ�A�>i�u�x��|T����q���w[w.�롱�އ���֝�����C�CX}ȱ�5g�e��n�%��4��{��w'�����{//Ѷ��g���R&�d����7��d��+߂&ʱ`K.R��W�S M�7�o��U���[��l�����+��B�u�31�R�헍��P��Y�&e�PG�{2��٨[gcN�iV���hk���KѾg�I�.��-�����g�,��-��Zg�>~�l�H����m@+R4ubր���g~*��#cct0��*�'y�0�7*A�,�f�^ILa�JM�B��2m������R��2�M4�
�B$��{�=g��!hvL�ZZ@j+lb
��a��֚GЇ���%T��Չ�Ǒ|�06�����|Z�L{�ޘ�s�}�A�exA�{�����CB�0Iiذ��#�����������JL����0TU἟�1�{y
�1_5����Kc�3P��>�K��o��>����@ަ]m������ȟv���T�+��������7PqI���7[1�Ժ���쫌s-��~?X~MnJ�b���Fѕ�2Xj
�[����M�5�9���E��b��`tUcb���gz��e�NؙpȬ�3�y^����j���X��dS�(��GO_��L�'L���g"�tԼ��E_�`ڄ�́�ۏ�C"���+m.��{2^�6���TXq/�l������vG<�zG�����C�옌�8�~������lZ�����k��
���t:y几��sa<&�-|�j���vj���Td>$���x�#0宷������x��|�HKj���#$�y1@��;ȃ�2cŘ�	[3W�-m���4f�Ӛ.8����f*�)���B.��'I}��	�p�L��eZ�b���v�D�\�>;1eq��	�����$f+N�᪗�k	��"�kF6��(���?.�n)m!뼢X������Kk	�{� ��2�=�b��y���bܜ�UkX�����ϸ��qK|z�1��k e�(���e���L�Ǆ!�Q��/��-3����߳�TH��+@�˱�^џ)'��5,�B;~v�Y�;B2�5�V����?[�f.��K�#0SM�E�lWxnԂ��K��p{����e2���B�(z�Mx)$�O=�(��Э��J�cj*6��V�3�ac��c���v���%&f���>G��(���	ǧ%e���'!FJ!D���vR+�ݴ�،_
k4kϾ+d:�4�g����Z7���l�Go�i����2ͫ���;U(��/�sw���}�<��5�yf��u"����H6GO#)-�%��gW��nXџ��< x�'�$�h�P�`v������ ��Dm�B"�B�{���X��#�S1}���f����h�8�����yZX��b��]��T[��K,IO�)��]:WC��{��qX
�i�9l�� &v��E��Eo�����}�rFz*î6�c6���m-��x'��^��`#k^�+��)�Ν�����k�n�~	[��Y��IC�����q+��q���X��A�[�'���%'
��a}cM87�(ٽ�}L�D飔�07� '���n�x^Gz��/��������/*>�VH�MN�v���=�L JD�I�|�޼�֫ϳ����R�����;Ll�G���uHME"+ԗ�s5iﱼѝ�T'��j.ZO�1K!�^���J�\H����2l�Lp���\��OMyx{�u!Z_=�|-TE|������^��-W�q����_߯��"�ĩo
B��v�K�X�Q����jN/��~t���!BGs88',��q�!$�5��&�пv����^��G;�ñv�,H��d�%g��nr�*c�{+��lg�AKӧT����;�?��!C�$`�0�i�.6,�B�h��f�:�w�L<싒t��v��jgPi��� �^w܋���2׎�iEIIq92�79&�!����ħ;��V��~�i��Ѫ/��]^��M��Y���|T1�x�)~ ���:�ޫ�l>_����K�����[�&{fb�3��ɂ�HD�X0�b����ʼ�_��`�n��B>� 12�����#����|�&� Af���FH����Vѧ�����0���'2x��ː�	�ך�%��jg\�!�]��,x�0���z,1�'q��,&��vabFBK��sq����,j�d�|-g�a7���$�Eh0��y��+.�gÞ�"}�Xq�����w�4�>�#����=��z�G&L����pؽ���y��_�_�|�p1/{��#�x�u\��'{!# �`���a�>����
k��ƅ9���̴�����c���v�������I9_n��?.�g������9��}J&�ʔ�2�+K�&�o=��t�-s�Wh�f78����t�Ȝ?�o`F$<�3��Ћ9)��5�h��gU���{�Y���<<n�7��5Mv�_��X\���v3���Hv:�vc�Rj�����/IT��w�ףB�,�7�bI�����ƸuS$�5�e,)��i_�S~�Z�����QUZ��$E�m�0ieJ�=�!�?q��Cs�H옏�1�J��*ѧH�;�U����W�$�\j�%�E��Jܻw�,A%}�V!���9ӌ��L�ߧ*a���������ly;'"�1n���������'�*�}1 }Lv���W�� �Y�Y�|޺�1jr�,U$��Sj�i��J��MX�9�_y�{D�6rNR��Kx�s�.|��b�x<�I��ھ�=GhO�t3a8��'�0��;��_���eG�6
"�`NT��V5�Z�*Ǐ���!,��2{��_R{^ �D���۳�-��X=����s�ma}�c���1lvƅ?O�!w������Y�=����cr�S�o �������vr�������-�Is�yֆ��?�~��?����      �   L   x�s�w��H��P(�?�0O!;#S!=31_!����tgM.�p_E�y9�y�
���
e��*����s��qqq F��      �   ;   x������x�km�B��y�
%w-�T�rr+��C�8�3�A�@5 q�=... �L�      �      x�3�<2!1/]��ć�g*T<ܽV!��^.C�8X�$H)�&Vr �/V�(}�{;�Tc��]K+��Z��e�6�(2*��ҹL�r@�k��3J+�n��2���?� O�hL	W� s@@I      �      x��]͎$�q>�>�<�SΌ������!_t�_���d� φ���O6��o�#���_TOwWuU��,���������Ȍ��"2"F;�9'R�EV�}U���F-��o}���ɯ�շ_����_��_�?���r�[���%������Ar�MJ&=|�������/���Q���d��J�Gc��~������������>��g �y��'�?d���޸rWڷ�8��RcV%RKd|��-Dx4�ɺ'�B�0c�R�:�a&1N�I����}b����;cZ'ׂ����Q�ʃ��4r)5Tk�]6�ܓ3�s�^�9���ړQ�W��rR���ȍs����cdQm|">1������ ?��_?���=�ç�\n�3�ϭd3%���+�tT�CS��������<��7h�����X8nPx��!r�����5��9�|�*x(;��3w�2�O�Zh�{�	 �[s�+�)ᨸ�R��:@k,���}�Xx2�G�]
qԯBx����0�ط�J6QQs�h�Kp|!����,��s�(��N$�9��8���J#�lH0Ű|���oI?(������L�;�w}���bĠ�1���	��蠢�C�6�-B�vw�e�b���R<!B�B�H�k�&��.��!�4���v�;�r�F٢G0a��V��W���b1O=���}�+Q"V���8:lo� =�����Wi�KOb=��[�a�jNgM/�u-���a�V����|4�j"g�;6�u�'Ƃ7��"��k�.����k�����ֶG㡱PV��*fs$��W��;�m�|�G'��>c�v�R�iIuq�K錅����f�p!ħ����Ƨ~�������ۯ������?qؐ1�����;��4�|8K3��(��<�m�T��
=�DB���k]5YX�j�#>��9���ڏd�3Q������M��?��M03l�㝅�+�R
#�q	l�p��B�(��pz�������"��a���$C�(��fq���a/0���q9�G��ը�c��00��������K���1���c�pq����/<����N��C���dm�;�#��PD6P�a��Go+B��:��b�$���e��\%�~i|�O���.WK��g701���be
�W�Vbq�F����S�+��]9`��ʳC4�����hKg���/Ķ�����n]W�9P|����M� [��!�%��K9�^�Xvګ�C7��-d�}��Bڶ�Q��^�����^���l��n�D���61Y��:lb"U���UŨ܃vp���x��8�"!p®?��s<s�E,!��
c�s�n|_�a�6!�p��>J�1�b�*EX
*9{\wКKsy����n��pat�	����60��MZ�u�%6��!�l l��}%x�������I���dy�ݗ�G��+�ᤚ��(�5Ir"��;?2z�D�.Ի�dQk7$�I�I�O�����B,�7�VRMUX�ւȶƬ��"���y�~��7|��ǟ����C�����_� ��Ϳ�O|�B�(_����o��_��~�㍵2���'���o�1{Z+{�> 47�9�Cp�K������Eþ�fTԹ(�G$������N�2�[�ˉ.����u�V[,���;Da�iֈ�+�@(c�X��X[����o��'Qh���ac�)§�����������/>��ϲ>���C��}c�d��?��=)=ö;��h̚8���e��]���ý�:ß�;�����}�����b�l<�70���b�9AYuL�ʍ�(�ćQUڰN��v����(@�f���(��������U�a����RqU�hk}@�.��n�\2,�=���~�rU�@M�z�an;����z���|�7u͍sX*Y~(���0�QWc��H3��wu/�hsv�$��]�:^8y�y��k�\q���L�� ���d�muaN�ސ�,B�=�Ƀ��7��g��u���J^�m��i��`2�VBt��^��q]��yg���w�N�������6�А�4��4e��D�QuS9 )y}���-BX�4�4�^s�K��F�����$T��k�J&�9!��/��2I�0j$�F#���1@=�h'g!��NNX�̣�r��(����'����(kaj�&ٮ�a�L���*>w��>Ru���#yb�S��L�������[��W��.D��p%�g��4%� [���P�Gm�[�F>�ظ9cq�S�N{�C�|����|/�h�)�U
�$č�EI�E���z
��\4T�r�ޛ��%U��EZfp�o�gfO���B�GI�EO�Hv�T1�5��͒7��I�̔�H��m=��s3֔��ׂ��ǹ�.o�N�hӵS�"��K0�5E0]|�^��,�w���+��p����I��%��/�ҁ�x
�ĐT�ENl�*�jT(�G��~��!���	�t5��d��G�Gagl��[�^��ӡ�O�ʕ�d�L�2&��1�v���*Ӂ^�9��aۜCnc&����k�������3����X����Y�g[Ue$c:ŒWu@���Q��h.]`Z�]tҞ�G�,�={����l`~�#�c%�܅��8���5z�=|bi���ʈwϱ�K{1î�]����-Y���"�ơl��xױ��N�/����-˺���#�J������ؔ��d85�B�=e*��e�F
ٴVct�a�~k�7ֈ����#v㮁�^m^��a�r��R�*U��WQJW#��Z�7ʗ�h;�G�r��X���	��X��nTz�q�{v*D"%� 0,_T �7�7�;j�
�A<f%r~��t*��������Ak60^c����u�1v3�SUo�j|V�eM�ZC�{M��J#��MQ*>a����4�����a�]DԢH�d2�R5�t�#s�c~��E6s�]3]���6�Фb�5���1rm���x똸���ƃN��G�6Z�P1��"oS��>��*)�c����	ڨt��2�U��`�5[�=֏@�#8(����KS-a��B��������P��=��lŪ��6؃)F������[��{�9�k
�꒭��*�l2�j�ۥ�s�dVquJ�L؍��kلܚ�����j���]�#7;������h��$�8JIUT�jR�G�]�ɑӍm�@-n�V�fs,]b ī\L��������n3�D,��CT�Ei-p���&o�u� `������u�D�4X���b���,�)�V*���}e����v�:�5n�A ��v�$�;�Z�L�VM�Ձ�3���	{�O����ef�R%��<��`V��!jh��ѦvO�I��ɥ�==�6�"՞^x�j[�Z��	��5"�U%R*:7�ۍK?�V�+���3?���������$<1����ƛ�ֳW��ҳ���(�襤��0Pp��5}��bo�'��[V	?�}~^�t�h[Ŗ~��rĎ�/�t�K�$EKEe�Y��R�=vo���=őn�c3�#Z�{b|讨Kx�C��$�:��A4v��.D
l��G��&9���K!n�����F~�\i�k�	2$�&VI{��l<d]����X:�7����E��	��m`~�{R�a�1���D-�0e3xe4��#�j��2�[Ol�i���5q��Ğ�4�l-]�h%%V0�Ve�t��[4e�Z����B����H���^�#;T�=suՌ��E=|`��/����dI�t� D
� �5����
'Rk>�;�=^�g��CZ|�U����'w�.B&��¨f�w}ȝH+K�NpI�g�-�6FC��j�v��$x,d�A�I�u;tl�֋i,֛���u|j����v��F��!r�ͲNج�U�}WT�6 W>�ݭ�a�Ðf���k6%�=\R��G�@S��PMZw~,�"�y�>V���	A�B$�]���FV�t꽔#�F���BSN�9PA���� R�*6J�E�ý�e��R
���t'�j�`9(D�ce( \  �|��	��>���EOD��>��hh"���epw��k�G���C�^S�Lg 3�Tՙ���q���Ɍ�9$N�0,IuH��L��6��ȃ\x��~���RF4�63̘�&�z�}p���Y�{'A���z�l��*�w����ZN�h�G� �^4Jv�!k:RwS��HY�!���[9�i(��̕��5�<�Gы~�>v;���4�A����8��ƒM�]���N�dqxΰ�b�z��(GZy+EW�!%��T?t��eo~���^��v�e@%��*¯�JҔ�{>�>�+V�EL��{(Z7Q��T������%s��y2Ǯ�,l���_�r(!�\t*�wI)���Rw�*��a��U��Ɣv�EFL���<��17��E���Y����\��������Nby���dU򥆲�Nt��ġ�w�SG�cu
.����k�Ic�=IO�+�{mǎ.�ڔKkU���/��֎�F�V��=��֎7��r�~:�S0JU�$�J5���#J�+{�t���:!{��_�16�H�c�N0>������6U�2dQ���6ᢔ�x��v��|� 6f:���\����P����4"��A�袌�եȈϨ\�E��5Ϛ��� �C.]���ލ��5�K���CFӡ�m��}ka�k7㹷�T�9a��4n\�W�)��tT�)�I�}�T�)�'��{���XK�A�>��J!��g'�Mw=���>��ӹ�4){¶l�t�,G��i~��[��M��o<�f�4a�B�L���ZG���SO7�ab�^�ad�jΩ��a�n%�F�b���\c����'3�ye�TdCIX�{@�ج�]ׅJ�w�_ؑ6G�)��^�cR9#�%U��q��@B�����!���}���t�q���9�-�kG|4�0�pa;@׃�6�3�ԛש�t�*�C��R��7�;Xz�w���So\U�d^ۨ�p�QX��C>U���{0H����t����ٛܩqW�ɵ��C�mQ1�`�6�׻����+�B���#iD[d�g�X)�b�L��`��-%��7�w}��Ъ����TF~e���G�/������ �4�n~au�f�������R�sZ�u1�p��Ug+|�m0y���q�ݍ�)#<�R"���hta�E�f��ݘ�����d���P��1a��L�[�b���9���R"�Ȗ+��j�x��h�A�U���
���*�eL#G�5&o��1�洵NY+C�ر$���A�q��|
�#n,9�����EqN���t��>t����q�sU�0��}��oU��I���}��s�(aO+Μt�8�ՈC�)+�bD�kʱ�ʜ�@'���в�������^�m��*8+���U�X�+Sj1�G�}o�O��L6�1���\�%�P��33�{�V5�a�[<a[��9�50`���]�J�ݟ��ݜ�m�s��������.���R�xF��Q�l��7��f�di6��\���,��\���3lZ~�JS�P��I���l����(��n�=��m���g�s��*e��-��2�]
��2,���%�={t��Def����7\��1�����2s-�bR�i��j\��U�~>��̱�����i5��7&�|��;�Kz7��Ԣ�E#d([�[U)�T��Z�]�c�.�W<��Yi.8��r,���A�p2��p|Ի�zpCw�p�AՅ�KEB��,4��-��p�vF{�w=�3N�-{�yx(n4n.�i����8�t���RP���S����9�{��%�5b{ם�N3m7�^i��V]�ac�ZbxT������1ע���]ZJ]ѽ5ՙ��nl�]�BG�l^B�*k���&�O@eZxV�����Jj��r��~��w���?ž:      �   �  x��KKQ��ɧ8wC��*nk�
B��f2���̝4�Lwi�t�.\��P�ڠ}�$CW7�{�o���3>"��Tі,���{���;3�y�t�\�R���+���M��Q"G��	;�)Zs�:�ݐ?���zѢ�;�vv~>��g�������E����Q�T��Y�n���qD����C�^��bŢi�:������d������-Z�d�2��yx�>Gp�{Q`ס�RU�[0+����_O�����Y��(e����ەHs`�E��z7�|���]D��		�# 	���C��OBIr�M�A���q�±"�E�B�=�a�&���]w�킫��$���}īZ�@�9v��T����s@n"�:�|�v���6t7&_�U_����94t9q��?�s�=��������+ow�!�9����˒%N�=1�]M����#2	w[e��1)\RԌ�CJ�+ɘ�f̘1c�5�Lg����x�j�%c�4���^H�� �Q�ިbS�y���Gɽ�y���W�0���lnf��s��	�yU'�-�s�l����MDG��Ͱ2�t����Q���]C~\�{Ɋ�O.�f�a���e�Y��압B�Um,ĺV�z�3��%R�z�t�o�d�r��U��<"x"M}�m�S.��<��Y�E��u��B�/8); �u��8�pXg�xi?H�a��2�g�B����Q0�Rx��y\W�lA����={���=p^���:nÛ�LدX�f���mI�>�vm�D2�`�� Ig������m��̩E�|;r.�+��:�qr,�D�m$ B)s����yéǸlD&-xC&�3��O��Tc+`Z�Y����H&:��>�KL�F�s&p�*��ݛ���]u��3�w�q�&=�7��w���I�5�P�o�Z�e��_.c�      �      x��Z]oG�}���~�EuuUWu�>y�M�ēY�w������Dj��y�E0��0,� X3��(Y!�Āa	�������V5�nR��x����UuϹ��j�w��|�D�z����7���������t�jOv��V\���x���,6jw}f��Nu4�D���裛���A�Չ�V�aD���x<�9p{����N�~'�Չ���;��ߪ鈴9?}4��� ���(�;?;�_����g߫�+Z�C���??�\œ����I��z�O�'hظ?������h�� �*��~��4��c���˿�����7f���d�;�sh������Ӳ��P}�`�����Y��S��)��Wc�͇` ���˭��f��ve�O`�G��f����V��'�~���K|�ϳ26��<.�/�f} ��a�`��x�Qu��4���n։Kg���؆~_8x�.�QO��A����2թ�+0���K�f&8BC����xg ˝ƻnoP�����x<��]l>�5G���Pm��M������no���˭�(����,&SIV0��t������"�����������D�R�K�\gLf.�D�$���f �sDYG(1�	&S����J��$S~��,���ߋux�|�>��\�s��ϰ��ó�"B���~�%]�@S'f��x�gF{�Kތ�ƪ���/�����g��5��|�r��7�,����`9ė��83z�W�gAB��R�����J���� �0�7B!T��#��}��e������M.��{�|P�'�`�
�"��00� �^#�la�x+��$X k}����0ڃ�RچYL�q�I�VD����Q=�l@7���ģ���/3�A�qR��<~�>]A[��+�V7�OD�*�'��Dʲ��T:�Y�S�ZU��P�}�?8=�t�� l��Lséb^DF���
��L��@k�k��M2cB$I�3�l¨�D厱T�0N�<��ƿ��[Cpk����&�����c����([ �ş\B�"E҂ M| �4<���˂�[��~0�K�2@g<�Ԟ���a�򽗳x8��鿪fc�l�,h���}�g}� {��;�h������SӽСp�0�=DC�!����C\����wu�.�A|��'���x�z �Y �tc��7�����z���?�X��	o%���0�1Hx� Q��#]<-1*�rpё�_�uZ�>�l�>t������uݲ�tl�����n�o���h5V�t#�%R�ܑ\d̲\�\�Bp�+ K���ڟ�$�8Y��8aN�m&d��4�W��=ns��"�	��JW8�Z&
�Y�m�;¢��rc�- ޯ�to�[n��PQU���n�,i"0��:�|���=o�Rp�X܊>�������wn��c�?1?�T�d�����	T'���#�?�ÃT�ު~�e�l�ȳ>�zo�����AgAn8� }�����f��vWA��EQyo�t|��h
�-WC�G�1�N�۟�'��H�ٸ��3��րt��/��4���������?�#�z�W�	/���s�����-���X�k�	���D���:���^�O�o�`l}zܾ�:���[n���B�G��ǭ��|�i�SBY����a�;�����<?��cMv��C36� ���d���`��&�F���=3�2�d����L�$�`@!�s^䆘���AzIJl�ؔZ)X�6��D�</t������@=YZ���i�U.L�Ia��EIkR����ȣ���	��w�(�I;f�>��ʹ��C}�]��(]������s�U�i@	�^���>��ZA{��r�#�1���s��p���/��"�������5<��b3E�]J@v��#Y���~+C����w�g�X��NX�ϻ��OhH���S;��(�#a�� ��(�/gCOa5~��aGWT�h2�m�P'��ݱY��L�������{�eN�$��Y�y5���h��;H0X�ќc��	9�b��<�L%��ϐ��l��j|��!Ea�I��&)#"�y&��0ZZ%.d�� �L�T�c�(��Ԛ+)-�Y&)g׏�{w��uQ@B�rr�\����RI���$�S�;MU���q��x
*��� \��9$�!I���iID^I"]&_���B-X��d�N�x���-{ ���_o/�����6��ztk.�
�~�@Bm�^�u�:�0`ԃ���~P��>���d�~�h�A�`cs�b$���w�?:���Ӗ�k�
^�î��}
���O�;�K�ߖ��fu���'qflW�ÁArt:��~6 @ߤ�!H�}_���`��&Յ�y ID�* 	5�-�狋'���O��S�lS�fXF'�	΍�bЌk/� }}�@�h�� �ژ��Ƣݨķ�gT�2�r"H�չIR /Ir�f,u��o���$��?S��AtRp'����$�������9��Ж2��kF��,˲lNэ��K��;���D���I�!�ƨ�>����Hs���eȋå<��G6mk��
C:�S�{��!oW.��j������z2�F�{C<���֔��G�
��7�����x�Eh������ ���R���c/��餙ny�S��A��-�,f/T�����)��OV�jޗ�(����'|#��"sBi�r¤��B'��ܨ��z�l�;�Q�C��EZɘ�L�!�R���ErUo�K�,s$Ky������f�)�[	�ݾEQ���tYY[FR8�Y�Ra\�2~�0_��4�{��)��_oo�x5+�kt�q:w7����U=|(D�K�"k��H↌��8�:f���4ԃ��P�<		1V;�(T�1�O�m>	�yU��\��qK1�G�h��:��.*��:>4�|�Ut\@_.�E���y���;��fe����W�����(��:Z(�� 6W��֑sJs�W�_���$e Ii��k ̦�Ya�pn�|�2 �9˨���i�3GM�9���2BjtQ�:��	%�?M����z/�*}_�&i�r�KXC��W��+�����Y�/r9�Kޓ^*��O9j�.���W}�~����k�%���nSh�9V� �D�3�@e���K�H�^|�SwO7d�hH�
i�s�YjU�2�C����ĩ�����e�A|ʹ�SF&m
N�͹�B0�d���u��_��,��q���uL�A$iۇ��>�]������Xx%���*���w(OL+�9��f�.��o����11:}:OSt�m�+�Q0j�(b�x��k�.n�����}�<ɩ���Լ�A�[7�A���A�J+]��Z�l�%T�C���4�^\��������7����ȥ[�,�5C��j&�h� �Ii2M �)D�䕠��$�9ՐҬ�g�7#��:Ƅ���u��rb�c	�z��GxJ����0�G�q�B؄���/A�ц�{w�S}���K���w;���l�*�+��8�;lo^�v!����p���3|�ݹ잴q?��V�p�{�P�h�n a��P�lN��9V`�8p�F�b���_('5ނr�Aޱ�jy7�~�H���ʾ�v�$}%�F��Ҟ�$˨2��%���Τ��(�yo�3r�)F�ZsA(�g�#<�f��'�N�uRCƲL+���Y�U��X��oo&,m��̿�~��\p2�v��r���Iіo�+L�
u$��6jǇ�Va�jx._�ʣ5;����9@X�H���%>��� ֣�N�O�+�ѭ��uO��v�R�Y����cK��b�O� l>΀N�,y,��G��p�O�����^�:���}�n�5h��= ��vq�f�4���h�:&�j�R\��񢖹i<�}I7Tw��\7x�bˏ��fq���}<�~FQѺT�R�u�\o|x������x_���g0���%�Zq���U����di�� �	B���1�%Ɯ��(Y��lwG�+�$7�h�2F�T��q�K��];�A*ǌ�P�1��y!y�\A    Hax!Ӛ+>���� �0      �   L   x�sr��t�I�J-RH��W�K��

�f�����8�3sR!w��
���� D܁�j���!�R���� +�%M      �   �  x�ET=k�P�������hI���Z��`�"L�D�\��t�
��]�d(�M�v��J=�O���<Yv������ǶHnןE�U7�8/2��&�>����t��T���j!�v���Q)v)�~��6��%fA�@XŪJs�T�}d�(Yݥ4����:ì��Kr���x�WP��.%%��N)����8ٮ/S1���t�(i�ٲ����O��ٲ)ܮ�Bg�%� 9�N�a�M!Z��R\]��F0�QĖG:ۮ�����BH��@��a����A��6`�
e"[�g�f��#��ؘ���S��Ej���l��c���ض	,"F������a��ݮ�L)���܂iM$'l{���4����I�����j���!�Z�F���4>v� �.�k5�Ӣ�~G�ώE��o��j5���tuu����q5+ύD���s�W���7>V����*/Q���~�E�^�t'�t�gG=M�Kv��%�iI�1��F�i�cv-2�K*`�&�^�{��f��!������aꌇv=䲨�)q:ׯ�jCD������[�����)�?~��&]�a�<��f�up�Ӗ�Y��>C8� ����6����ܔ�Ud��=�F�zC��=Ϥ����-)��'�<˜&�A�㈤�ۑ�g�Ec.�2m�ຄ*��������7�U>�G�[u{-��M�G��}��t.0�H���E�]      �   7   x�3�4���,I-.���O7�2q�F\��I�\&�)�ihdD\1z\\\ ҧE      �      x�3�LLJ�442����� 6�      �      x�3�LIM�415����� ��      �      x�3�LLJ�4�2�LIM�1z\\\ 0��      �      x�3�,I-.1�/I�(1����� ;�6      �      x�3�,I-.1�/I�(1����� ;�8      �      x�3��O����� �5      �   �   x�36��K/�<�*N�^�
���r��*�d�n�S;Ҝ���p�j����'f*�^�I�KC#C#C8�А39�)5�!=713G/9?�����9�0�LL.�,K�L��O��26�9�&/H��Ew-�؍�6��P82A�u>�����4�05419�477�,)���@r:���������+F��� ���      �   9   x�]̱  ���� va�-z��s��1E:Kd�E�B���"B(H�S���u t      �   >   x�st�,}�kq�BI����
e��W�q��q�e^��z{pzg^����qxA^:W� �      �   h  x��X�n�Xv�_�A/���F�d=��dJ��
$E�ԃz�zxA�T!���I�n��4�z������CY����UȆaK�g����kQ�RRB?�)� ��)�֢2��j�Rә��d��+�Ф4E`�s���������<PJ��0޽��s��f�?�Cs�I���_�����p�b�Z���'� �(�H��(X{
jP��
A�4B��
���[����Tg�-MA��I(aTCT ���'�]ns��n_͇J�[���s�;J)����&�;�*TܘJ�����L\��d�N���|ܰ6|dtK�|��ބg��G8b�U+�4�2����l�ԕfrD)~{���W+��ܿ�|�B�z��Z
�>�_(�C�R���*���ݟ�z ?���c�Iͽ}���_~��b����bp�4�i �˔���0! ��\;�PR�=�%aL�n �5��� �^�y�V}�O={�P�=/l`�� ��Բ_-��3؎�f~�}h���z��[y¡"�׿��@t#]�?�S�V���.�qitN�C]K#r�.|)38�����8)L�J]�Tʸ�E)�R� ���.uW»E�h�n�����ϋOw��A��l����M3WT~W��R
�i���C�B�� ��n@��(b�BK~��y��Aټ��%�#�Z����ga#�"�û���yk�#��.�^f�I��Aoֲ�#�[q@����T-���9V F)�N�|3JĜ��A�3&iʮ����s�("��Pbs2 � �#}����D�Q�H�(1�������"9�����<EϋI���#J��ŭTتZ�cM7s=-bh'=��V�K�A,{����sbpiWg=J�ur�a,�x���5+>���ޣ��-3�m�/`��ѲXX-��C�6Z�Ю|;��B��[�*mY���2��U'o/���0�o���05d�@�/�����r !@�i~���ʑ8Ε3���l�z=;@tr)P�ج.�-�F,��qc�t
f��Q'��nY��l�S�a8:k
$�݋ˋ� *��#����pu��'�1��LW�	�u��}����0��S�w�tX#���f4��|�ǝܶӡ��r��%�W�#�raϧ "*�i��\"H����00a�D��Ӛ�P|��;mD�f��MI0�kepcH⹡�����v���L~8L��$��x��O+W��zy�y�7ʵl�E�F¹�?�J���j��I7���=���'5�����P8T����f�G���D3�DKp�c�B?S�6��/����M���f��۹�[Zy�?N�܍ge�{����4�!#ˢIo=�z�Ia-�	�4s.:��|��ɰ�,E��[�F�����qn3FM�5hj�=]E�2��`� Ԕ8a�"�3+�Y��)o�h�ӟˈ�P�^�Z�{�I���;�]��01}U�J��9S> 5��\�qa�@<Q��\�0L
Ma���8v�V"��U�_�dn�?��E���Y�V�����N�Z;-��"/Z���<�K.��yF?��/A0�vw�>�	��2U�Ȃ��"=~%��Q ��S��7�� 7]���ԼI��OL)	>Ax��D��?9��x^kQ<;C��Զ��n�e���5è���Pu����?��G���K������#��L��S�z�{ݞ�p��y?Eŗ��F�ӑ��U���i��h� I")����9���T��U���<t����Qo��V�[gޮ4�r��5)\�rkִVv��0������;�srp�7��fbP "1g.�%�0��Ʀ.R
`�*R��҈�����g��e�$�G�B���s�Le:hP�5��;����nکnzmgSm��gP۪<�]Rhߙ��)��N�g�h$@r�`#]�*�/}�P����OP�-Gb9��.8���Qf0"v.(b����X��2`Y�z��C%����n�[��}',��Qޝ-��ǡW��r��{V���(���t�\خJJ&<���(�&�#�IX,-b� \�q�� �� &����I*�w�0s�j.�:�nm������	�ϭUӿ�����ve��`��c�Bt�*V��A����g(�{�\��?�qV�W���+��{�hW�-h���C�����E� ��5��	O�#KpY���f�>18\��7��HDz2���bט�Ǖu��/t'������Lǥ���ec�+O�����'�4��>˘`/��4�|YgX~%��Nȝ@CH�� xx0�a��|�ضmڞ˸��w����%3%}�؇��B\�ovh���[l>3���n-F�|�D���9���� �0%k�v�`F�\g��q"�=M����}��P"�$�	_�f���/��/�oſA�����}A >�Ft�_�����ļ*�8z<����6�Ac���4�yhV���tG^l���˒�̒'���]ׄ�:�I��$3p/���rG����%`Q	Qk��H��� �@��dL��i*��������F����q��^�b/���� #^�fq]��j姻U����{�!�[�"�U|��bBl!�X0��������)���,į��^�W� QN�s�$�H�_y���g��S*&�V���Bm�~�~��%�y��l�-�=vZ���w圹��\5v̠Ǉ��³�8S����{�������+�����a���S�S����)T٧�u�ܗo,���[�ڨ�$v��L��!���J�����V��(2>�T�\C}B]������ ��`_��$'�{���E˓��[5�?=��Z��ìi�r$�5���F�3��b]Ie�uF��R����k��h�4���V�"쟾�k`t�%J������3�!��z�{<�� �������#� �      �      x���K�G������iwq��$3�4�9*�͖�9�WP��)px.��4�F�F(L��PR����E���FC$
�8*��'x�u{����zÇ}q"<�annn�67.�޾8�<�w��q���Y�6�]s���ˋ������,����]~�ҁ���_=۩tl���6���{��7�*�������anN�;��K7yw��R�Ҽ}����G�����ѭm���H�>�
�M����~������mۤ��<��;�.ߺ�Hzv���eqO���e�D�^�7��U�=z����D���wϩ>;?��/����e�^Ａb�m*����h%�F����:�q4�M�QܥkK��QG*��������M"A��蔿6Դ���|�{_E6V�NYQ�F�4m![��ѽ��4�Y�:C�uM��A�7��дk��M�S�����+���+em��(æIEd�h��]�-Q�7���)~al�����X��q�f'5����ưp-�m;�$_���/���^&p��9�1n�,���Ec���?������,LMz� �'��ѭ��W?�(�����0W�x���7�Q:�,�r_�p�/���/v���o�tI����ԅ�bo���`�s?0m�����/.}�H���t��vB�I�7te�XO����	I��͹/��ƌ��2�2�~M�3���i*�[��қVn��u����W�[�أ�ߜSmH5m�?˜���}�y`Y�r_|�n��if㏰ɱ{X.���ǎizcN�&���YMo,��Y%Y;�$�bg�d}쬒,uLS���K��)~bn�_X���&��4��k�,Q�5k������o�C�j���Gwv�%6���$]���OD85g�����q�uM ��vЕ�]~��Xk�����4�����-WgQ��O���{~7wx@Oc���w˶�-�%iL���=�J�ϩ�Ry�<�K���.�����R�c�'��֧��6| ����L2�MhM�>�!��p���SlF �c;���j�0]���+�NC|��Ɋ*~��C0���8�l�dKhe K���N��玶�d	o���$�ق�8p�Ӏ~U�០�<<�ݠo����������ʽ�����ׯ�!����[Pv��OY�j���,���y�Z�E���Z��ji�M��(mc=Ei+*J�XSQ:Ī��1�U�NM�sS���Tn�6�=�A6��6�Cv�"��5�C,�4�IFX,@�NE�t.
�KQ� ]�L�d~�i�M�v�XAi�XA8�b���s,V.�XA��bM�d=��Z���}�hii*x�,�R��a���O�i�����I��c�}�����48=*�f5�ih)U�!�PXe`�Q�d����&6Z��Jۨ��Z�(qjCR��[�䨀=�҅�/	*�NY
4�%� ��O�
>����u��x��$@)M�O�>�i��+�O/�]��I���x��e*���wJm�vL��X@ia-��0PZ�(-�.�c �;��.����]2�R�Ŏ�}�@8Ď�c�@8Ţ��p.�
�KQ( ]�BI�ty,��E�
Ү�YA�>�RJ�X� c��p��
�9+�X� \c	&a2��R�����+J�}Q�@:�
ұ(W�NE��t.��EaQ��/� �*¢
���� ,� �*¢
.IXVA��<��<��G��O��0�ba1����AX� ,�q�8�a<	Gq�V�5)@鰟��� ���ތ�%�{s�
ŵsU�Sv��p_���\<b�j�W+�����v�$lcMCikJ�X�P:Ě��1�4�N���t�] JcFal� �cFal�(����06`���){���ڄgr+��.�Q��*��P˩PZ�7F�n�^��j_R)�ߜ_�K�5�n�*CP�Y���4���|�����q+�2�Z�J�F�B}g�R��v��Z�VQZ�VQZ�VQZ�VQZ�VQZ�VQg�(��U��*
�l5	�M���0�VQg�(��U:��֔F��W��$�5|V���%>PY�K/�ڀ�����W_�����G/G�g�ѩ�=N�~�V{xZI}|����.?à��&S	�x���V��ūջ"PL]��G'ه�kK��[��؄�cX~H�=�rb�t���J�pDX�8�&�KT�0ٖǇo~�$)������d3��/M��~�óˣ���^h��Y�!�X����I���Ϸv�~�q��OK�6�w��lk�-��O��?ܕ�o�>�����ѭ��x|�b����� '#��%}e�%�*��������U���~$�5�.���P�Bb���7��	�;$�7}��b-�R�mnna��Sr�'�������zp�>pt
�{�1.m��e���ؤV��>�O�|J�=�vX�k���cŋ��Ry��C]z�����$ۘ<��J��j��ᬼ#y���������o���,��6�{y��À�w�D���n=����y��#Nv���/��b�?��$�H��SG]o*͗H��uV�y�T�Y�z�����+�LF���eQ�ũ��������G0�Rm|d���ǙH�嵹#_�[%8��0Z�V�d��}��ĉ;�y����ַ�9)�N�+��g`�����b�>hq��`�t���z��s}8��2Fy;Zj;��/h_�����vG7�#��Y��ǌ���F�{�<�d�����+�؜�
w~qt?:����0yXp�/�RqmwG�Z�%u��=�p�����Fx� �m��Wے�2n�k�vT�갇2}+l۱ݭI*���$N����ߩ�6�&EJ�d�j*���������6��O��{�;���!�� �P�~����*X�,�[�/ �y����EC��6�����i��Kl�Ԑ��[ ss��Ž,lZ�2�Ɲ�� �f��7�8Y�U��y�-�nK)��?�C�]߫O-�9>����3��ié�����I�,���W�q�-u��Ő�b��k���կ���̡Bpt�5q�\�1����n���zt���V*�Kj��4tszɆ|6�Mb�� >�(MR��Qퟭx�:{KG]��܇{q����HZ&9��:�-�a�4����i����n���7��א��Xή8V�r\ KM��(]X��8��ޅ"69�E+>�B	�:��&�����J{�q���H���Hb��¨+�������9��Z1~�4MIm�WN��G2`�#�(>3㦬 nq�:=|��J;쏊�{�t�B��,�9�G��Z�vޗ�X��ݙ���kڈ��o/��Af�)ٝ(=囬��00<J�ߺ�'������$��ÿ��f��$-�x{i?~�4I?}iA�g��U�w�*�D���8#ӄ�Q���$����xY���u����,X/���Q���{$��t���,�J�	��������im�.����`X������)�i��?|�-u���\�2sָ���4�>(��ׄ��pO���a��'
=0`/v�(d�V(�%�n�s�%�$B]�_$�͵_$6���j�Hձ����D
w�>ٗ�ן>J�֓��>��:ƛ;+\1(
��K#N&+t����t 0����Az��XD�t��Xy�p�`[=�A��5#�ߟ�u�O�[�Le[X�H��5f)JӸ�:�V�lҳ]�71 �ߢ��k���F�ò�r���H6ګ�+6n�x���^����B2�hJpO?�a3����j?�Xs�ڠ˭��KB�7j�Mp��:�B!�`��;�O��o��B�C��h�*���?��~U2�����T�59ݖ�gɧ�gJ��i���ϡ+7N�뵽���x���z���%������c�^*�G�k��ɜ%O`�r���Ƥ2��'��TSYċܡ�$@S���1D���?�R2y������$unW(�G�;��D�pl>���H�5�5S(�{,���j�q��T���P���~���C�H�5��ɾ�P�3��}��``*��B�B9���1�Pp����M��C���醎g��
=+��Ϲ�    N�x�^Yg�=�x�t2�l�oMI̻��B�a0;�����&w_��?$k�dG��s���3f{ĝx��4��>���<杂�mo�X�@<AC���it��|)�~(V�� $�Lo��YP2��#|�1�9���3gT�ɢ��6��^��u�o6�؄'y��M4��:7�`�m�53VXD!ٻ%]s�P隒F������%���J����%��<2ą���q��g�>�*&Qx+�r�:�)��/��C\�${�q�pQ*����JJ��[�o�E�=k���UxSwhT�G�_�˷EC��xWM@E���y�$J^�O�kh�05o�Oa��飒���<�)l��T<��R*S���Z�`��� ����{ѧ�>=���K�S��>������s�{�M� ���x6�A���:1|�0ԭ����WH��^�6�m��d��K�5xYe}q��Iu:�C��0: ������J���Y���xi��쮿|���s�?)��<�M�u�T����R���a�6I���]� x@�6S����҈�	��c�-u�p�,�!H�f��Nw��+��\y\�P����Z-K�Dm��GCy/c�]�@24�����F�B�`H��)�[`6h������/��ŲZj� ����,�m�n�3q'�[�@qM��Gޗ�D?�-�c�d���]@�\�䅻�}�����o�8	���DU>�dT3����itWVH���I��dBÜ�����86ʀ���$����-���Կ�0���|1-;^�z���d��p�p�0m�m�>d��(��xE9~�.�߼:�����QF<R��#�/�����R���&\�K�A�VZ��9�*�YWDy��e5���%}��	��@�@��/ǹ+� �c��r�2�N�v�&a���Vʕ�F�	�A�
��3@�Y����Cf��uw����=��6L���������9rө��8j�_�v!׆�|�p��yh�@$�̉Y)�lxԀ-�����1���Y����pO|���X�)r �
���c+�Ht�����<����y�&��j����.��8�$[�fӱ��K0���� ���)��6�z���"�����FF�"ƒYCF�~tb�=9||Z������&�!h�[�6w߿ԨO(�H|����0@���ǊG^c�{�L6>�F!z�Eꃬ+�ҰCD����y me1o��J[��g��;^��on{�=sE� 5�K��g �;F��?���7�qP��"g�+�HV!�ˀ!�}nCv�b��ֲNn9�^g�r �	�
 Ha��B1w�wR�dų���%��a�-��ZFH��J�
k�@N	�oͮ#��\���ݨo��|\2vx��94��ʔ�˭>���w��lzIV즒�~f��(�ڄ��P���_�[a��w�s���3� ��}xa�#����q��f�ó/,6��W3�f�(Ü��^���Ґw��b�i��y�X���{����)G$�J}n��v�[�$3�E���r�z���'iR�V��0�?' �b	M�&6�>/N:�-E�3z�#�2���>�\�w�.w��Q��/�����(�W�c{%�k�V�@,�xk�-=(���.�5K����;�XB=lKy�@���^��5\�"˞�
�U��n��/��n_���&r�~��1�T��uFd=u�oNE��>�v0k��6;��|b/�gN�[9����9�!�5��5O��78x���`-��7[�<�h�
@=E�ݤ�t��C����e#���W�7	#B�T�`
;���*^�AP�~�̡�74��<r��;.��ӎ�@z%�F�Nr'�Q��hr�8�3�C�����&�%q��Q����*�H# ���V\��Bqל�Ŵ���!�� �r�i���a���>b
5��n/��m#�MH�G��Ll�"ki>/����4*Y�M�h�2K����Й��o[010~���Ӕ击��>ɠM@md3 H��	y0��-�>�aA�q�S�j���Y��_���n|F^6�h��)�yK��G Yĕk��HV귋���*��|e�v�J�B@̵��D�(��CIu�l_�Q`�s�u*SV��8�g�X�A�W�jµA/�l�|4M���*�5���/�:���P�w*��ST�J��8k��I�D���/ϣՌd�fa�gH��r��:��)��g��#Gy+��ً���o�I��7֧�#&� 㰘0�@�̳������e��y�@ ��L� ���\_�-��b.�bF���0�]gZ	�Fa:(è:X+
Ų�ⷸ��l�4��{�@���{+_h���b��.٘ة�Ͻ��^�W��%�ɗN\|�Y�r�;�߷��m�S�$WWt� �cC���+泝 �1sS�]Ϲ4d�!���k�}�y�;g�J��X�ũo��Z+��O?�\(���Y2%tjh��vK#���E�M`M���4nBF�y�Ȋ;c�ؗ[��(��!��T�M ���嚔���&z��s&��	��_�H���5l9��֙U���M�&�n5.��g�7��2�������o�1�Q+��a:����/ʸ%V��R���*׺��v�am1�i��zD�Uh��xȦ�6G��d�a=I�~+LW�צb��qRy.N�V��զ��|V�r���a�]k'��cY��9Y�Q����r�^̗�r�q�����:�AU�bN�+'�J
�*F\��E=L�)izA�Z���b�T.�ɇM�hY܊��� f1���pYH����֤4:����$��6�5���R�>\@w��pm�+��ʹyc���Ŕ�-dda�ф4�W���R����^S�T0)$iT:T�JѬPaj�pƗ���&[��ny�/Ֆ���"����F�ӆC��Q�P�Ќšf#���V.6kv/*����E��G�1��i���oW? (�V�����W<D$ݨ�c+O9ˡ�,Np�5��P��9�t���f�������<M9�6����F�,�b�?�;-��"�q��տ�P�_Y�BU��Ó<��V!=@����-� 8��K���~�
TX���n�G�|�iCfIBC��ذ$MvB2�O0������'��!f�:>�
�ぼS��F0��1,8C��,�gԞB�	�9;�=��4�����x�EQ��`-�x����(W`��N����7'�=�_�ۖCv�l�_�`Z1�1#��������d�#� �v�kh,m����-b���~4d&���m��ɟ���hT�4V�
�\6���D���g�%P9>�"�[���!�W�G*�C�AG�_<::�k���9/��Gc�C��ⳝ]ԋ��}#DC�'>]:�D��4B&[c,�����V�H֘��������u��Ѣ���[�2����f"*o<j���_ؤ̙��g����y;����>��8.L61���V ��b��h䮵|[T�X�ؽ �M�.�1�K�J����df9"��o�19�JX���u�_Tp'g�1�.d�kk���ͼ�6��TD:��V/cE'<k��dL>��h�Z[Q���#7����#��3�M���pY3��g�o���[Q�>��bj���p��D��nE
���nyK^��DÕ7����2�2>����}Q;��4�;�W�s�����[7����g$l�����,��'�cN���`fN�}�0�qW�]{�@�Қ�֮���� ��i�9���{�*���k��2����r6Ql%]��Pҵ���ẩ��,������Cݯ׼��Ʃ$|�k�ʈ�X�o><����T��Y>�}����t@��`�91gg��ykINâ�Bc	���o�u�^:�1zg���i]�_��].L�n�:��Q�թ�[Ф�����
���y���=��%�6O�(@,��h#�n�1�I%��|"եt;�D�ᵐ�-��"���m��&k���2��W��    t��e�z#+Oulk8���Y�AX ����v�H���� #���#dbb��L#���/�x!1li}���9�I�?�z��Gw���J�G�I��{���N��h�P�5w�	;I��,�4@Ȝ��Ec+��_Ԇ�R�>��#��
����<K�bY��U���B�@:6|f���G� ��wCHbB{�4�=�� ����:a�m}�Gf&�y�.�ϕHW�Ѵۿ�Xι��Jp|�	�\�2h��@"�9��io��݅︑�|����|�w�����(���7ܓ�#PM��-��g,n��?P,��ӿ?:��8�|ŕ+́��12L6����2P�Ea��"���]����{hD<p�����G@�G���!�Q�6C�k��6<ժ_�g��jȝ ~�) ��'�5�윸7{bD��2�  �
�!�����$��uB���d�������Pe��D�
XiK;<kk�������f�; N{���������J�bǛ�13j��I�̥c莼O[IY�'h.qo��5����aY!HU ���:<�rr6�M����k���B�@6��01�	�%�`�u٢�f�S��p������Z��_����^'7�5U$�Yq��:1, S��Ԏ$2��RA���Y�w/b��u��w��i=�:��ujA0��
kG%B�,#H�����C���[P�L�l�� ���N�!�4:j>sY�(yP?�*B@�i�K&�klĥ%6����Ęt� !gGZ ݁�V��AK6-8��cv3�l:i������0�aKbj�P/HB�бl�/%#j�ev{��`�
�	�(��㓭��xܠؚ��'�9��8H=q��;@a�O�$n���E�2�����u0���uV$��ɭY�T�9�B���p��E~��V�ʃLT ��^p��켦��El��FǇ���俤�[�1ۏf�!�*W�N�V��q��6'6�.�w,v�I����eyK������&���5f�ȹ�,B����%b81Y6L��*0��Rj�������5����q�'D
��:"���e!��Q��[��꜄Q�FSN&�|O1l345'Op5�.�)�p���J(�?R�K ��as�卄��S�~Tt䨰p���l�$�����Fg�˹�ZA��!���m��
�)9� [����'�M��qϊm)"ZѲ},.ԑT���� ���]�� ��� e!�a�:_�3�(��E���C��L�c���y}p��Ɯ5�uQQ��2��	D-X��7�-���h��N���~��p�N�1��qxE1��)Q5�}MG�5�+��4ak�N�Q�QD�dō�V�;��,Q�J��W�H%��F6fV�������M�r):Ʉ����j����ؐ&�ptn̹�-I]ǆ�#�o�O��܂��v�HF"q����|��E�3ò
"^\���Ƥ<aa0r�~q�J`�q�.�A��9&�qh��d\&y�B ����'�r��ʹ ����U叭|���w.�Z��@�	c�>_����'.W���ߏ����lss�}���BYsx�^�ݙrw[t�3�~wH%�a� �})�������"ܖ4��u������,hd��o&��"6�}�,
\$X;x���W���W'�"]�� ����<l��������JQ4r ��]'�"ҙ.	�5�b�d�&"^�גAΆ ~�Z=���|�&%�&�zن��n�4�9����kQ����|�d�j�X|���e�^NtE���X	�L���\��i�ME�K��W���Z�x+E>���p�r�y:�.��PW��HX��@�M�=���Y̮#r	�����Dگ�`��X���W�%���`-]i��8��`+%n�����oi��Xq���	�dt��%�a�� h�T\���M�$�4M�f���ʽf�d/�tC�۬9���KzX��<�[߿� [s����B�����$S(z=T�dc�F+X4�<�d�!�I�\�.��(Jt��A5�`�+�,�UYAv��7�m��|����p�)���FB�ke8�ʠ;��ât�
_����� I�J�]F��VT��UTV><����F���ٗ�ۆ�"om�;�Bq궢%� �4�h�P�~�j�F�4�SvJp<������n~�ď�)E	��;�j[��isM�-�m��N�I9�;���R�-�����}Ȁ.*�5:^�A�4Z`�� ̜���8��5��*=L����ɴ�[)���_}U�d���~�,z���/S��'3�|����tT�����TKq�t�y�x�)v��� @ҔB�M<���9�� �^ܕ)���AM?ɛWa��������2)K*���I�}f���ϺKWIד}"�&�c(i5�ݙ�L���[�r\1x�r�wҖ;�A��dW�N�u�c:8Ոa�Jg8B��b���4V8���	K�)�G��jzmctj
tVoX�R���E�g�T�
�)=���FvV��O��k|��ANʼR+��@�_�i����h�WPI�/��>)��+�mha�z�.iT�B*�y��<+xP�"��TE<-�qV���Ɣ&8�ѡ�I9� �����Ұw�H�(짢�6wO��m[{�4G@|��XS��!lR������@z h������95�B��Y3�G�$M?gnR67��	�t
�li�t�������s߫Ks�#�ONI�m�F������SNu����fR� ��5�]���z�l�)��3�1�N�}{==�J�fjJ,M 9o��ip�Y�c`-�勏ʲ��d��w������$I�����h����o�C9�ec��72��%<m���UG:]:'�P���PL��;�$���`��wF��Nu��T�,���S�h��Vmɾ-�6���GJ�����U�G\|�w1ӳ-�W�� �[�AQ6�)"�aR���0
g1��Gꑧd�W^R<Qԍ86��]�K�.X��nʊ;�=�ʅ�|������s�H��Z�ͳ�m�N���[2(���		|!'[���g�W[�t���nF��Oͽ��*}��t�9�Ea>����\&!T��#�Z�����"���aQW��Lz��ΐ���'���܃�w���F�=�O�l���%���UK$��=��,&9�J%��i��ve.@e4����?�JH��>��d,����S'����M�������vD���lHdͼ�tmgwEY����Qб�����3�f`C���Y;�hR;4�b��B�_�x����
V�[��G6Ղ������'J%�6&{҅���\yq�̙�+sփʓH�!]�S"ɿ�p�M�s̠�;u��(X�ƧOM� K�O���e��uoW�U��
�2��sʨ����ʨ��`�E�:"�]��Xes#g����S{ʳ�O?�J�k�
���g�w�p*>��kB�Ž�/�j��o���P|��&�BƂC:��p*^��4��*{�r���q#_��
(m�pv��ϭ�ű���ӝ�&2L����3F`��4G%W�Q��(��r�� )S/�N���f��w��iH��+�+@�&	����<��<̓B��=x�2�4$�!�C�@�?PN�S��@�>8<�=��>u|6M,� ��2@������Bg�̲�fٞ_���1�҉�2	�:./Cwa��J�� ����D,t=n|+�Y�a8�_X6NCO�S�:^�WR҃�i�]ޥ�
������WO�T��Y�u���z��yGeX�j,NCp�.Gd�YV<M�1_�	�ޚ�H�8�#e�0�Ԫ�;��\��c*���yt`2[����g�]�"n�ظ�A�j�4�q�7�<Д{�U�G׳ᲂT��"�w_���Y+j��F�'&�R�J����������צ��ۍ���/1�Rw�XD�7��f����8�+n9Pj���B�A��(W$�]��2ʥBᤤxTɵ���/�Ԏ�DZ�PW|��}�P<�	�c3��S3��s3��K3�Ę�O��G�or-x�	��Ӡ(�<�@��m���{�#�    �ӻs�`w��Aan
w@Ej8U��G-���f��Ȯ���G7=^5s��Mޡ���ֺ�5\���:3�l�$H��f��ptп� n rQz&� 7'$�T��JL��L�&�pb��t�����Q���ˑ�\���	���\}�J���J$;T�cK��@��y�+Ӧک ���
�Jh����u�3P1г3U�����,�����VlJԘ�+��`&�E@Km0F�.WB���ٰ���
1}��:�����e9�Jo������Hd��{%��r��<�%2������r������R���{���9y�����
K�,�^�_�+��r�W��׌�'��ơ��!&�<sV��U��[q2�� {7���_ٔ4���V:d=�MSyr��}7�d��vD��uD��<�V��`�_�b+�J��{��ט��r�Z1�\E"�9�)�U^+�V}L$����}b�y�S��3�X����kM���1��ܣU�VwA톐u�+��GL��o�3�m����|��@��֋9c���׏<��		�s9�q�V9���;p)h. ćOv��4�t���Z�|-�N�NH��B�h��9�zԐ�������h61u�Ms��6$ek�oGX��6t�M��Y�U�œWP�i��5eZ4�3"�rq�T[�V:[�aS��{ ���J ��[ k3�i�ԕ*�^,i�ɷ*N!4m��F�Ua�
yo��Y��v��|u�(�1���s�ɺc��cW(�oEU�B�,�q�J��Ca.B���4�_徳N@(��WPkin�su����i.�~���ı�������t��&i&�=:���}s�s���n9?��F�}~;���DY��^:Ci/Z����}|��4�J �	�o oQ�����Cǃ�G�����J�lD�z�O(w��g�gSG��$��8�9X6lQ!��_\�a���FQ�Pɬ�@ۨ+:��<7�	�SD*)Ǌ漨���f�0������<���ɇ6��������c�6�^��_4kVQ^�aIVY��y�.�(���4�P��n��B�2�U1p4���e�Z�75�1ϡC� ��Ջ��P*sd|�]��<LkA+���+p.f����KC1l�K�l����̃ù���|�6������g�|����{Bv�W�l�lv����#8�����;^�W������;ٛ�O,�����O=��f\�(�/(%[���ӣ]�K;���P�`C�����{�6<��������?�]��;/�ތ�(g�>/+a�����<ɹ�7�b��7 ���=#�^���+����~��$}��Ԑ��V%';�,�N:+g���F�d�
4�L�ڻNeoi}<fZɐ��;��r�,�)�{��!H�m~�'� qv%*
;��|��fnV@�J�D���Ar*Z�o=�<�ı����(M6	�J%�O��J� NLs ��WHr���h��![�t���䴸Cx�i�$�U�NI���>����Lh���6�Ǳ�kH��a���؉P��|Rh�q��M̅���EjBqt�Z�	�9��>Q�u�4bSVyK�R�_Uf �tp�\L��i���EDL�x���nJ@H���A!*�m�&Ȥ�=��WI_kg�Df����EyJAdU3�Y��p�����C(X���7���> G���z��z*�l�Y�J9"�V��O5w�lMc%�tp�u��#A����| �sW|�Z邌mK`�+O�ǰ)"�E��Is7��\g2�x��{��f���;� L���^:!D5\�Q޿�b�X����/M3�m�k2T�����¡9u�Bx�7/{��;@>�<��:Yd�F(�&UE�	^��0G@��k���sGA9���,�d��[-����_��	��'�H�(ec��T�7LF�*��)�4t!���Uı�J�,�n�\O��uEC^�mG
�z�>�mK/�G('���y .[SL�Z@�����:�� ������ �H��Y5ݥ��d�Mw�o�*����F���i
�Y��I����J���R*~�B$��^$]�Pd�iDrX��-�Dm��d�����z�V!��T9�#�YϾxP�ZVE1/_Ma-촊�d��pnaV�s�"?bV�G���Y���n2����d @������=]{45��9>|a6� ���ӣ��r�(���]U �'�с	���k(�<�*����ݘ��f�e�13nF�����lP�t���3Z�����.�t�i�-z�)�X���h�����	�(����]��Ο����Ю �xLp&E��k���n���c���Gd���#�� V��y�ȓu#�brdZ�����ب��v�oa&S�^����ȇr����P����@&�����$=��E��&O�2�#\�D�`K�4�ʜ0c�
�n�w��*5s2�.����G��t ���s��:��E��|9�y���p��@�G]޺0�,�\�i��.�4�i��5��Y��Y��%���6�ù��py�[j7H��;�I�Cgj*�n�,N>�J�Q:�����͞�8��X�E2�̀M��`̢��"K�F���C�K܁��20曲�7��Q��`���L��(fl�������g�Q����ó@��g�<¹9��yxt��W�R�o����U*��� ^A|k�ɂN�t�h���Q�kn?�(�E���z.��H��֨�<�ps&�-a������R�\9G�<:��ujwƨ�s�T��n~�uXA��:2���=��A�չQ}S�!q�i�Yi����ۛO���wo�S�3�jZ�B�<���~��n�	���2��'�#r2���C>,���4���d����/��͙����0�h��͕'��;�6k�n9f>�:��*$�uMe�zmA���J��D��Z�t�
w�_G��b� Y�����G7�'.3�S7/���ˆz� �vv����$�fv���_����S�=�!Bوor����߼tmwlA�ם7?0)*��{v�e�:����#X=.n��p��Cu^)Z����W�QY�|'�`i����PY��qF�@��?<|�H�r[<���Tm�>X�1Sw
i�^f�a�:���%a8�Np�������pw�}n����� ��Q��<
dhN>Lu�mq�H�;~��PK��Ό<$���~�~X:�Sc�0 �&g�����*��6h�X=�^EqG-�ac����A:Ш�[@���_����[� ��q�b��~X���{�ot�����V,�S�H��[ ������Q��Z�e��]w-6��?��������-?z��15�Ë� _�yo��es��\�@Z�>�^��s_\�oj?�������Ho�VV�05�e{��~�t���b1{� x��)�am��´���aMf�M��&���1����QB]s3Y�����{�VO#�]�Z�����}y$X8�� ������s�(��]�i�j�=��j���]������}2$�'<�2���+y�2İ�*n6ʳZ%rҧ5܈�b�e��2�������PJ���|���j��d����AڮAK����oC�3�X�ff���F���� �.�m?�#��q��v��U�.�x����jĶ���f�"�������P�h꼷��.���"ȱ���� �����˿�Q&^<Q�g+��hp���s^3ܢ��z��˂$��Ű�L:�������� �B���� i�ٿ�D6��
�`9�}a�D��`�7��8x/�.+!�=�����̅H�51�Ef25��A>�MW�t���JSq�Efp�ʫ/�����!�vMb� [��?��:G�	�F4�Vb6O}�턞YC�X���# AT��;Ӱ	�Z�M_Ch�3�O-ʎtf���q���������b*I&2<G�ãZ����Q}��$����n��pj�B�\���ʘ��h���bl$�/��l*_%�Xq�ēdV2��]�*��w�<y���P��@����J��:�zh��W*rF��P<��i��ovX���Tg���*[�U    ooOvr���(ڬ�pUh��ϻ�y�g����Ac0����8z�<�{�Or�ovU>�'|Q�c8�+�@Ƿ���+M�S�l���u�{�*��eU��/yC�s��8F�F�&�l�����G8��x# O�a7ęe�9����,x�R�)V��H��5�qc���x˧J���Ns��GmtF�цm}JM�qND�gx
�eہX��i��PuhoWN�y# ��$��1[�>�Jϴ���O�1.1U8hj���`���'>`�����EżZ}QĄ��Z��T����h������US�=^��+b2�K_[���3}1%S�V���p�$�͠6k O��Q���Z�6Qk�U�c"�ڕZ��zW�'Y�R����C�ߢ�,�8ϕ]�P&�S���$�Jހ�!��H��GA�E�{�-���s��uc�������gE���I�S)|T�9��$K��x����:uj*�&�(k	*̪p��JZ���d��!�!G��*�9�&�7�7��ƴ'u�QW��v��$�9\Da<Lʌs&�8���X�|K�R���l���n4[�.ޢלW�@����荁<�pX��QU�\4�i���pFS
'9������i���<*�3��e{��W17��śf�2ӕI%�5��'���3ɕĳ�N�H$��g412�E���G��([������Vݥ(��p������f؆ �L:<����ܮy6�l1"$���)<��Ԥ�z�_�4g���Ks'ٺoΧ�=P�)��$�9�\f�s-��Ѕ$'����ÿ�𚇇\k�3d�������K@�d�ҽT�-��G�nM��/�T��%k�Jm����<�v]B�����h�%�P����hw�x�f�6�F�z�algH!��IY1���b�� �'�YK��>�:Byr��'R��Ë@�l�گi��%d3n��ԸY��ϖz���Z�R8�G-���sN�� �.�-�7�"���M�����LG����-�&b���L\{D��o���,��^wO�s.ENЌʤ��ik2�,�}����d��Z7�d8^

3(q�5%��aUZj�/�k̔�H-q�+ 
i�ղ�g�e��t�+��:�Mh��N���Z�R�<�qPS��W�8�����Y�H>J�X�R�U���_��p)��;�u��~���5!���7�:<)�rٛ}�����Ucf��!�W4�E8�0k�+�^���m'�ؚ��[1R9g����{N{��>�F�t:�i<�/��B�|~�Af);#[r���O\����������N���~�B��X�����PΊTih�`�½4���ɡxQÑ��4���^~� ]�:��=��fEnDA��@܇ ���-��U�*�����w03L's�-n���e�W�')r��_��i����������U����|�O�M�]���;uH����5�.3ye=3[	�O��H#ĔLB�e3�\��F���4��Q�D��mU�U���(�ԕ�C)�j�<�,r����G�YD�|T�LS�ʶ���t�G7��r1��M��@��ܙ�YC�Lإ�z-έ-MdRmʡXU�1�g�J"(��4Y�pE֚s��կ��֎�ӡ�����6�d��|8�t��>|k�^%f��������f�T��ґ�N�����q�:���;�B@g�:z9"ޮp�_���çGox��Sq󏗁u~o��=m�v�� �.�۾Y��y�d�;-�E���l�#ȗ�}L�
+��,�h�ڲG@y総�����T>��c*��1�O~���g�J���oS�������%���1V�.�6�m^)�͛����5��{�é�s  �˚m=%��*��&���d�
��U��T	'nmTQNB��.�v����+2<��2�|4p��k}�`Q�｝�)����>����3p-��M�/�/�T
��a��t"�*��d�}pt7=�;W�K���sqO��&=�ѝ��%]������.@��dG9�ʏ�
�nA܈�ld��<��
�S�J�5��1$4"Yߘ�4m�աw$�S��ƕ��6�+��.�����W&��c�1}8����2ޑ}�nQA!�������gD���5$��:6�f�j�2��s��y�Pל���Z�Z �!a-4�p�@r�!y�_ ��ȸq������ \�30�/�?�VQ��/��o��c[��%�n�����2��?I�� ɯz#��v�\�Zj?��aխ�ZK�g�I��V�{$;���{W���2k��7�*�pĻ��|?����D�Dΰ�ܭ<� 3�v�/����YL:ݳ�݃���ՍJ�pCO���d�x8���:�V5̭�(\˩�q<��)� �q5چIXz]���(�9��N+�9������vq�%�H�3=9�W�Nw���o�z
Rh��xǥá��AH�S-�k�"��;�1,Q)��岌�m��=��_P@��o:&���_�hG�ZT�U{#5�+a2i!ox>�=���u����h��$c:����[�2]ˑ܆�b����A��x�,�3�c��ڮ
mV��3��AXa/P��f6T�M��B��+�I�	;P:���@D�af��9P{�CՎ�pE;� < n�jԨ���'���F1��y���K ���(�]Uc�وj����S(=���F�$�[V�1��#T�NV�%��vԫ)�r�YU�*�-�z�xoU�LO���r���˵3UX��iE��G6]{�>/����UI�n�aZ=��&寫]=�N�7@Ul��u<��֨kX��1��*,v�gMa�Ã�R4�47���T�'E�A��O����0p ����
-־��_jJ���ǔ&Q:��Y����v��GüBi�ey,W�ʛ�//�b�0ɯ�&j@'��b�Z�Qe�6��2SlK����61oMaQ�,�4�T ���������J{�x��SJ�W�}ֹ�Lՙ���~�%�Jq�$�����sAV{�Y S�s��j<��	:':�rTg���2��i.A�TUڛҗ���f/��*�'����=�
S�f�t�~���x��`H@��QPX�Ba���G}�b.�.@�L]�"�2��y�<*�Ai���p���LB[C&q����Y�#W���*űn���a+�(�Ub)�r�"	������/��
��H�g���R�bv��WPY�Y�Şز�蚬n1U��l(1��4�eD�]��hȫ��\G8�;e=�������\��<[d�*q���L��;�,Y�s�\��ZF��I3byS�����MHd?_hp����߶�l@�7��2z�T�nNvf"ƈ�&��W����S������e:pg��r�0ľ7�	�`�{��Ha^̘K�55F�݄Q/ԎkL��T�܉0��b� &\U��Q/�x�d�#�<?���u�ݦ4)2A1Jg��}e?:��,�S5��'*rp�Y�l �*�6�����CẀ��7X�WJ󒶵k����}km����TS�@Z~O[�29\��(ʽr�q���VF���v2�F�L�����9�S�����#"�������_F�x|3���UϽ�|�v��Rw���a��G��C��\�����A���R���NE���
�8 X����G�\��|�S��##Y�H�[�5h%+�NHb��5�~5���7�9bӌ[����+\���-�!g�����'���3�㨡����dW\���#)9ÿ�E6q���e�'�������k\`�� {��0o���BŁ�GmA9o�
M�������Ͳ̌�
����!-/&!:�[H�������l���˴�Hf���Z��-����[+e�����"���@�
������ل�(�~�P�(��
������=^5z�|J�\�^�|����t�k|�#�EU�J5]�P�Y����7��n[����㼵r�8�V��p�	��N��Q���Q�&��+<�eW�z��ď���cI+�u�oJ/��EO7�ښ���R�,KP��i)|���J����&��_}m�+Ҏ
���+��ǸE%���lAH    Gٛ� D���# ��uTy�p��ym7����I	��ݎ���}>DdU���}�H��݀���ϑ�y�j׌�z'� �X
m`.N��l�>s�=\%ѕ��
���yG��O(@b�k�R멜}S 4��3�����g��4�9B�z��&�ffn��4�r��x^��ǧ�*K��[�l�7i{�;s ����I�:cϕ΄+)�#�&��>_��Ao��'Q<�7��Bp�[B�$�OS���CR���"�+����ꡪ��Rd�P�N5B��Y�N��i�)̪ƨq�XUB�m� �G����dM���7=����n �1@��2HY���̆�p|�y�
�M��s!��58��fH;��������؁p��,p6h�鍀;k�&k\w\��op,G����d�PĂ@��iXS�x������F�vY+Am�5w���M"��ܴ�9��M�����#�
��j@��ˤq�Uc��o)����93����/!�1��(��	�Y#Y��=�n��M���1������Nk��p[[*�d�ۭ�m�ڞ��q[���l�
s#>P괠J�uO�y(*�Ҫ��'v�̠�{�k*+&Q�+��[9�ύ�@�ms��r渢N��M� ���yi�f%K���}�#�I�`���`؟[�Q47p����A`�3�,J�k
ַ�P
LV��+�Z��,0��V:e�lq(�e�!�N��ק��Ш��5
G��L0�(��1_�U �ĺ� �u+V	���:�X���꠰�8�ʞ�ó�:v�F��(ٴ
'�����*���_��WX�;�B���bt��f{�D�|;D�h?>�=v3�V��(1��I�V�m�,.(�V��ʜ����d��pxz闱��a��vw����"�r�ʓA#ԕԫ�k��N�o���P�(�(��S�`G�>p�1u��6��(g1�+
7��C�g�R����Y f+�Ҡ���.p@k�(h�6�e�5	U�z�j�Fe����QD����]@ᵕ����kaw:���Fk�P밼�<ըó+?�U��q���!])��O��xB��ő�x�� :��󂩒�H�G���߾���(;�r�2�/��4�`�*BKC��Z�)��*���ľ����Z#��A�~�$��&��z<����Ӕ�* ���(it���Ԝ�|��d_��x!V�_(Q�̐���h�$Cy��!y�Ҙi#j���h.z۩�A��&y��Ӛ�IF��տWUt�/.O��G*f�sy�jͅ���fw'�uS�Rg{�������<|�g"���)z�#���q��G�VB�Ta���1TM�)�~[��`]�.�٬o��B]�0J�sJ`_�G��2E�2N�l|I��x���>��̢/{;���Dv��B����Ƌ)�i�¬w�f�'(Z!)3ԙ?��$�1it<�}d(�\e��8���w�Ц��.�8oNT4���QI�Q41�\%^�S<ͫ|�	�m}����
�f������n˗���3[ 1��sjc��IM�ϼ<�ο��]@c�G���JИAcb�r���̬b���f1�\VV��&D�lT�[>T�^���t�ÞU�Ϸ��VMgP�̮�H�'q���?s���g~��k.6k��v�A7Vq/��!A�o�8B�op[Y�P ? l�~���)�s�0}��!7ǈ��_���6V��G�K�uW>��V�_�J���?��eBEk�%h��S��@�֢����)���"����H������%��S͡�Tz�<�+���C
�(ʕ��Z�R�3�e*�� �J�[���a�f3��{�ӣ�|Y�S�>G���%ϤN�R�d���ȷ�᪘���@�n��~\���
�
9�}Hp���zb+��8^�@#��7)y��&��	"�܀b�Cї�-(ʹ.��g&�����}���ƻeg�xՙ�{�V��zR?���c��Y���^zVH���0Pr4<j�hr%�q̤Y����?�U���
�U:�R���U��~�vǷ���ǂ�,��?r-���z�=j!�2��%f�T�T?!Q��o2ё�;۱��YƩ�U�(O�nI*#�e$��6��OD����S���%�X[�H)�מ��a�E��+�n2������{����~u�k5bXp�qßܦ��Ǜ���A2g�W؋�X]/�z`CsB���%���!�`����@ȑ}~'�4i��ut�)^��o5 ������b�G�So?2 �U,sֲ���W��ג4�ʧb�?���>��U�`G|�+�"!
+�
�o-�`z�����Ym�AY�1�0B���+\�DʺaN*�����x�%U?_p��U���D5��ק�9 0Y�vz��>~�Q�L��� ��T>#j��N9����7��p�L3��l�ԙ��VM/�|��I��E�9T&���qJ���N�a�RzU5$l�:B�F��k�U$��+�d�͵��J����d����ՏmY�Q�%�k�j�U�_�&��$G�y3�z���m~�F8e��_��]����u��(� }t�� .���D�l�ZQ5Ka�:f����uz1෗���vС�gP���}'�t��\�W�n!�Z����TV�FT-c� w~v���|5i��Y�&p��{`T��'�m�Tf#�0��+���.���7�c��t�%!�Ɇ}����F%��?ٹ��k%�&�౲�F��˧�~Dұ����uD�,����@������`� �xtz/��6z��Xr\]�.�ͭ��J�������(���y��F+2��5�Ba�ǝ���=���iy�6�M3�*����̆�V2%E����4��Ʊ��I�:����\Y�n����WYyv��8H����;t�L� ���VW6ad���+�1q=�$�E�pQ���/��Yi���"O2�o�|p�'>l���t���{#�������:$��m�/W<���q~�:����{̮_�?��%e-0q曎C�����2q��I�2q��nJ���vV�T��<�p�u��]��H�:�I!����њ�0x4�Սp��5<+ڵ�/�}i�jF|�QJ�~�TR8�_j�}��G'W����}��n<���I�.��Zi+4���i���e��N�wi��Yy�Z��V S�������k��[���-��h��Z>y�Q�����*���Y߼CQrv�Rr���h =r��N	M�B��d.�*+"[�$6ldx�T�G�,x������ܙFyҎ+��7��P����שbw����W+��{�0�����f ����'A@/oB��tL����'�"*�{~�'4Gw��
���)�(�eDG���� ��/�vK)��NҤ`�k1�m��t���f�:	,��z���CQ%��?�,ާ-�L߂�����M�+FQ[�����ʾ�
�E���U�d婱��@b��آVb��ܧu�q��/�Eֵ�x�v���Fa=�q�d`��X�Q�ɗ�j�.AepP�K\3�*\2��2�U�]U��+�{cNr��gG�٫sD�������� �tT�A ʦ�� �t6�ճ���e�S(^-���C..�O�,�U��HsQ.�����\P�B��)W�sQ��	�l��.��K��.?;n�Sc����-p���ih.,��!̅�{=�����t2Ԭ�)���1.��O
�ڛ{��K,�Ԉsq�d�<^�^T��7t�k2E��P�\n�˛�b*����n�G�K���[�ػ��L��xە��Uޒ\�C��#���H�4���<�M���
�	�a�ފG0��*�)��l[�o��u��}��
0��wd=��W�p�1f�/��:���p��9�؅&�`h�>|��|�;�0�4�����~"���X��I@rT{�t�q�(Y��+[WgPܢ�fh\�:D.@Y�����G�H��d$��(���	����� Y��>
Vg�Q&�c�- �5�jPY�+�IQ�8��\��dԫ�
�ga�^���r�'Z���le�!��T"��EDe:N$\e���
���4�Q �{����^���    ,�Y�~�Lds���u�D�	��6:��&eqˎg��8�;22Ny����z��$������M�PkV-߮�������>>���ez������kʨ��qh��Q���=d2���3�_�;Qt��|\yM�1c��> 7S�i�ݪ`܀��<����w8�
!	�p�B�6'�֑C�s\���
� �\N[㸌]����57	͌�+��O��n_l�$�8gl?,��f�Jb]y�2^?6a)��PE���G���sFË(.u>
E�d!r�$���z,zD����	�\�ΫL�+v�(��z~�CL"��/�q���D�Ԑw+��D��5HX�I������7KE����cW�7R�N���pq�Sj�<����T82<uK��&	��y��@_��x7{�A���9Il�0�pw��҈-�
~U��P�����.}�Z'4h��gS�}�fQ\�D��yQ̈́|SB�0	�A�aB��G�X���E�
���W�=�
{���"80<�6 {F�j@>A�n�#<\V�u1����F��0z)��9�z�ԙqD%MD����gT�tp�Po��X~g���[��&Icpx�lcPJ���y!��,n����3�z��%ԭܰ�����@d���w ���橶3B�Z�=���`Щt���ʏ�����w���� [n	�=�����'�x4�y����3�B�$��� �� �9R��Q�?��]8ל��8���A Y mnze�ݸ��vІo�D��ChЂ��Eⲑ6�\��[$|Yd9x7��#�5;H�9hޥzn�x�8�4ޫ �N�Q j7X;�`.�q�9������{"u��?��cO�|U<q.+?FM��u����ÄsA�]�� �����#5�w��ˎ���Q��n�pF�\P��_�[1��ۊ�4�����ī;1��ݍ��4r��!�I��Dqm.�w�Y-U1��s}���'Pp��,���wl�`�k�v�pkZշ����f�jJ}���ʳ�T)������djWvSMi�]�X'�/3��q���C����"��H[�hh���,�����E�Cvw��B��*���lJ�g�~G�(�M�a1.��hp���Y����z�1�^�]�$4�
zQ
��`�ڋlR�Pd��{E���a�We�A$�p
6R-����@�p���7Z6��K�-�� �N�VjU��WE�PX@a�6���Ұ�utsv����G'�6G�y� ����*��30Fѫ��ׅ���#A���� v��d��~Q�\��0�QMC#���E�R��w�6���������=�a�Y̿�Eۙ�|�&El0������h`´�����)�͏���rm�0q3X�P��-}'�،�e��fT�[��A�����*�<Z��I���Ȟ�'�۩�+<��ɕ�^�4V�=�">߀�E(�A��[�!"�p��~ѐ��������ڤ�h:Z�4����'G:+����{�8�UYp	7�^���Ou��
S��R�p�brY.$?X"�E�#�g�}�\L�a \��r9��i.(ߨv�G�r9��x08�(乴�h�8�׽���Hsq��
�\X���\Z�wEAϹ���fAe���m��"g���i�R1s�� �>���A���@�\�F!2�{T�Ksw{ut��a�TV:�*�TBf��_�#̼�A�c�rB� �4IlPf��Ff����fEtf����b�K|eN.�z�RL��j�����PN�������x+uajkE�$����&]�t��9f4V�(	s]5�5~L8�X���8Lqp^�g��0+�OB�.����0c�ER"�#4�Ԣn�a����x�Ea�6�L���R,�
ga�_[+EStp�MXlM��_dcmj�>��q^=b����H'���K��j_�R���l����b�\��PQ:j�%���y�I%��#��w�cI���)7�o�V�4d�u�)G�y�$�d߈KS�-QP�aj��E}>4�w�Hečx��)�>�&f�_C6k6�'�,6O�G���@�ixI()d_rV�&	�Y�,zo�K��PUb#�]*K:��w��0("��C(�hTR��׆���G�$��G%�{�$cWY{#�ǌ4Jd%���WC)I(EX'"�n�R��J'�*���ҧ@�����0k���J���s�
�p�o�HO(�����X>�h�,G���Ehfdf(?���O�W��ɖ�ycc}����ܛ�1�߳��>��D)��}t�m�~�@8
��"N��"�*%����@���ʌd�D-"I���V,�9r>'�w5H�1�t��9021���'q��"v�P�b{�XÕ��A��55���90�%Ծ�*ӄ�eg��/�1&4��f.�Z�jժ��i��w]����A��x�����18���.ّt Кc��'&�e'br"W����Y\>��ؘ����\$%99��GɑI��@$�%��hՃ�ܴ�G{d����;D]>N�I���7	�>-��U�%B) og#��V
v:+�>2��uvҵrt��.y>6�|꩏k&�ezU\�m?_����&J�LC�#�%�q.�{E�
�"��C�
��o|zx�s�S��1"�L�kn���~����>?v\G����_Q;oo��\���4�������Tw,�>�w���`�j��g4�4GOVۄd[��H^��z���_�2"N|�D�S�A�'�V���#N�����ey�<màe4��s�	9݁IJ��G�Y���[�<�>���,�Pߨ�p�}k�ß��軚k����;��j����9
��:�q$6mhj��м�^C���ַ#���2�d
Z���2�D�q8F�����[~�jP"�+OI�**�Q�i�H��}ˆw���mr�/oC�����~��+���v簹�]"�Ū�kG��L�}0��hA��"��I�(U޹��'�����@�W�h�(�O�Ne]T�I�bQy~��oX��!8U�8Cc�����N�]>4sn��&�.���td����,0�@�|ZE�m��q��t"�V���_�xP�[ΚiχX7_{N"~'k��Ȭ��o.Uw \��q�j��L�}X�U)N���5'ýb�M|Y<���-�!ݏ��~��Dh-[F�Jd���b�uO�������e�2%� ��t	�C}��T2A����<�1����pF�v�ܠyL10�L���6g�6h��[�0���14��G�f0<e���m���/�$�%�e�-��6�?�d����`��� ��!�&DK��� ���⻮J�h�~ʞ��֕N��Uت]>����������H�4�:V{���~�0ֈ��[TQ�Q� �I����U�}VLb�%P�����0�ʯ��bT��XF��>�� 'S<�HlSF����їQ20���]ZAK�%�;k�T?� ��O��ήr
U�]PW��Vب�!�_��#S<G4��Z��]߯SS�q�檴����`h�F[�nA�e��+���U�3�y�����]q��0_�΀~v�n�Rv+�g0lW�*�	��PX��b�5�X[�1�%�z�R3z�md�,\ٚ.lT�/����t].'+�_vfelI�-ό(У���.�_�[C��։K��ި[>��~Be�m�Yj+��U�6�&76���E[F�5HfhM.@Sb����U�7�h�wjt�l�z�~]^9���2��P:1��^]#e��)��0�7\��`1�8k4��T
鹣T �j����&q2��W�|`�`���u�{��;�E�}��W�@�,����5>����0b�)e��K�/�vC���H	��u�n\����I���(��X+�S~E`�v
�3wOh�,���佈�  �	F��~�a6i��O�7�Bec����Z	�<����&E�RS���E���f���
0b�r��vN��C\X-��f�?&S�F����Q�?�Hk�ٓ@�B_��EH��.>[�&���BĬ�>�����ϗ�1;�]�;�4<��"���'MXr�'�LE�O֞𴌒�'    ��'���|�.��z���K���3�rx�%��jLRÜU^,5��D��^wa��o������4�������b�����,�Q��Nf�$6�0î�[��Y��Eh�**�ƩqTh$���AJ�t�Y��b���⛎c���g�M��.��	��P=3N#�E���1�*�|z}6e�&+���p��Jyz�E�~�}� e:��!�pT�I�sD[�q��F�yk��|�M_���F~�2C���mhg����Z:34�_s��i�B�-Sh~����Ix���g�y� e��y�h�������@Y!N{=��Wm&C"�5�j��1�pR�y�/���ي���%S/�ݔ0�Mm�*L�݄��zW�7�[�i�l"ag&aK
��ki���e%&�#��G�Sj�c��0���`�-ؒX��3l4�6[�kp��D���]|��K$���#�t��{�R�tTT�d,N��4���G���2�Z�,�L�-��9m��y�Tkm[2�Υ>�EH��C��hˊFq��h����6�Ʉ�#K��[�"en����ź�����o�j���NJL��2��Mo���PqS7�dh��?&OPD��~PhF��W�}7u����Ӝ�3�-]oRr~JV���Y�ڪ]Y�Y-�3�M��,���`�Xz�P�W�zs�`3X���Y,��U��	�=����f�5ٝN�l^�a	����$���i4���¦B����kZK�}�@k����dح��3[��.�Pf
wz��63V�ݎ����g�p�U���s�Ihf�����+3���f%0�N��팦m�EH��s�{NVM���vu�kn�t��M����]�=$p��d���["�K��qc���NQ�� �ܻ�X�퓜�#0�&e��}��?
p0�;�kC0�+��'�����n���c8ii9/�H�:~�`�Z��@R�G�[�6��ȓj�*u�-���41�^#���j|��/Q������n���Pfl{$�X
���Xov�L>&ҧH۲]����Ku��#rˆI �|[��Ϻ��3��)�����̚T�%�C�j2�;�6M�zr����_�4�������$5w�i>L�D���L��i�H��L�a�j��ά5V>J��D��@�ߝ m��K��,ޤ"L[śׅi��	��6I�_��Y��t�*~l2�F��Cm��hD���1�qg�򸳢w��l��j�\���i�\:O f���e��
֦)Gx�Mfaf�2���Q¿�_I@!"��,i�>�o[�d&=0��ťU�f�e�V6o[����U�����z|�"!	�ϟ��W�l1�3o�x+vۖ]d�ڮ�����e�-"cJwY�c������������<҆�MjټG]����g�j���w�����[Z_��)�y��~st��Y�aAH��Z�}�ը��������P��,a��Yj"R����9Uy�����<�*�z(�L`&����=����-��hŵ�VO�21�zs�F�pR����T��_�A�v���|w]��M~�7O�������Ճ<�I�j�z�����AQ�3����͋B�e_r�&�Uk8iRM`�5�dV���^7�5�u����<l�lR���
{u���Yecg\��ƿT��.V���1D�#���7{��1�[����N,
͒q��z� i7khܜ���8%3gβ}�2o��U�?�yUG�fد�6�k��N='J�o�Y�
���쬶1�jp֜���J�HͿ�K���説��kk�w�f˩СLn09�Vٴyxk�i�2���R&�춈���P��dm�v��	e�����_���^G�����P:��,P�\�y{���7��ܐIc���K��y
�~ϧ��d�y���`�C�M3��f���+���~}�HN��o��#]v{P���zR��gD��5Ԙ�+E��<���� [@ӏ ;�/󠙔Oσ� �~z��˫�?
l�5�iyy��i3i�:�q�Q�w�c��f�<����d��tH^dU�7˪�k��GQ�+Ӭ �Znö�Yu�
�tU����zL{�i<�WU;m�u�*�g��e*��V�|����3եkw�Y����Iߖ8IWyYD�щ�$PK'7X���x�eso�VW�K[���ޤ�����.�K�V}�߻~w���}�����f���&�ڽi���y�o�(7�et�\�-	�u挧t���{/�΂�
����r*��Q��"��T����2oE#��p	B�3�C��.�~�d}&'Ta'�۸���]^?+��KRWz���i�Q����P�IQ��!hH3�3�Fd����sFx�n�R�:�P�ɱJR��Tu�R�=;�"������O�\����m��PKdv�%��N��`]묿פ4�[e
�����n��V�&Tr}�2��{�n_R�E���)�%Z��&��L�h����߿$��X{۶]^��&��.�nk	�ΙQ5L���y���V�	�M�޻��S�J�q�"A��uZ�-��誵�P$T�w���R��l@/�ov�4��׳Qa�:a�|r��[�|T�������V5���yh�2�֪lx�1��2�����py�i�hvy_��WFM�XFg��n�}t'���fk;�U0l�����B׭́�P[t�
�h����:�Q��:�\�r!�c?�qsJ�\�L��>�3�U���䪷�E��Ĩ��0��kd����ZD# ��G�km�YD��<����/�v[U�ڞVXJ�WyÔI�,c"�λ�����>��[~aj|�<?�gl�b�J#}m�,HU���LcB�v �fg_oј�T��Y(�d��2���'/�!�hx��s_\g��� _��S(��6.B��2��̆8�I�ȓ��7���Ɋ:%�&���HPփ�^WD� �i��1I�ʸ7(�c?_{��+�L'�K���c��`�З����=U��e�u�(G8�V?�e5�a˺�?3��N��lPV}����ɠ[�Ι1��>����V�l-b9������Դ��}�Nh82rﱓ.���1��!!����B�j�Lݡ�3#��缛(v"�k�d
ۭ����&�d葌���o���_�ɮ������!e��|�V�}�M�*�w����HH�m'HRj��a�#�^�4y�.�P���+7�Y��`R���ż�N��>T���tQ�4ag�fSf:���_��J	�ZB�f�0I3T��@3R���]q�z��U��:��>;��حN� �*�oج�9q�b�Of�%�a��� C�$���k��[��Pt.�l��}ƑZ tH�1��j�g���d^ya��8���hՎ}
��u��SrP��7���N�>w�g{UB�]�R��SJ%���0}1Ӿs.���R��<�R	�R8��w9&��֗���	����1�A���>�>Z�;(�|�S��+-�l�5~��Lk*����^P�ƈa��AR�O�Ùuj�*�C�,؀�����}�u����.�������ꘒ�	ieA`�3�e�T�l�!f���&m�A�I'G��>�y�p��t��O:DF�
)�d�_~�l[���Ԯx!��������L	��QUB�V�x�����X�N&�sʱS���<��uqߐ%�݇�ŝD𦼬�@�\�����C�v�b� ����?|�7&����vs����������������e*g��� i�����&���W��$o����K��;��!<�˛o�B'<���G�߽<z�A��Vf$$Ph���?��7���v��g�Mq��:� �-��_������!��D��j�$\�����������P�!n"�m �R"�Q������ô�-������ĩo	�w?څ��w�柀�s+�}��6���p_���)���j�_�e�Y�#�j��]n7w�?<	��������?�_�Sb��E�)�Ҍ�ms4
z�*���Ĵ9-c]~�'���5n��v�*m�Y4��H�q��ϵN�?	D��u������p��    :-5�7�$������(y�sre����ϴl_��F~Z�jW����ص_�f8F�|���7�/H'MZ�7�;�p�[��G��e��g8�u�����s�8�e�����8m�|��Ј���}x����߽| ���u7 �襛��:��C����01\��G�߽���@��t�c��_����S7������%zm�}��杳��pq]tt�A�S/#�EH�$�^�S��w7w/�%�/N�n�@&>��,�{?::-~~U%�]��m	��Z>������JԖ7����4���:߭#�Γpy��y?�&Y�w���T���śW�u*\��˗�l��m7PZ�.ch	L$����4_����t���u���׏��Q��.\�Ds�����p�G@<��v�z�#�b�����\ dn���.��\�_������:��;O}�e��C䭯jc����>ܷH����6L�|��1�O\L�BC��]���e~���e�/�E��"�����[���׫�����Ǐ�w>�]��d���!c~��u5�q������Q�܅#n�~s�4�g7@_����Y6��-�Q�SʄM�<Φ_aZ>\^����J��������6:�g-��;���0i����] k��O���br�.�d$���;���I���82oh'sy( �/�xjV=�
�=�evn�H_��y@�.���wv���T�>�{�^��:Pt��S2Dϸ�f)��>�������f�9ɼ_޾l<�z*_ya8߅�iU�����JK�]���i����9��i��d�t�x�|A2L>F���?������� d��h��>���l��<O�������r�����V��k�Ge+L�,ڔo�I@B'C�e�q�_�9������l�ttq��p<}���C0]V��I�h�٪2���������4o�k{��ҭ��_��<�W��i��OU�	8>��;��Cdb�H��p7E6���n>�fdU����:�n���i�7MS������q���˼���g+�\��a�T��!mE���8<��c�̫������R��Cʬ��{�c���1�+{beԍ5v(lV�x��p_�&�>�3 �ޟ��~W�{*�+1x?gK��z�y�!�8s���w_WoYR���*�6	\^��} �SI��&e�ɇ�����|�-��qˏ�1�ȭv���7�N�J�x��5��k��\Ë`�,��dEo�O�;��B��Th%��\�3ܭx$�����=⒋�&����$F����ۈ!�t�	>���U�p)B����x|����:\nT�����=�^�U�H�{�B�:0u�`���qT*�~�-�z�Lu��O$7��*T�A����8�� 61��:7��Q�jhc�U'z���x&<ڟu�+ 0���`s���>��*4�	_��ہ�'~�z(���.D�Y�[:b&7� �^�N{���u��߽�)O�	:Y_�M�|Vnai`��<���T,�r���G��)/~/o	]��-Iu��-(U�9sm'hH躸iԐf�ANe�3ؼYg����RĜ(��z�gny`YUm�m�����jg6 eЀ<�y{1!�(����[~#��w,�+�Ku�1��}�P�OSa�D��/��%�ZHm�^5�>K�V�CuR��i6��>�Y�j�{���p�E�+]�8��UX0ێXS��r�:ՅZ\���Q�����@�w���n�� 6U{)�ԙ�|�T;i����b �v'��M��uV��M=�>��:$_��0_CM�|s0�ˣ� �/�K*��"���&��{�M��ܗ��y2oZ��؋��� �(�#�_��Nv��߃Π�=�U�54����
�%P��3r��z+���0�����>��)mG� Is~��Z�MCz��&hΔ��W�{�g�qE��̨�%�F���*���T����B]���cڋuS��v�j<����҅kb�҉费���à��\G���jOY"^?���,c԰2�eZiQ�2�re��>�h/y�+������ryc�����=l�a�/������X�&��[��$E�a�~C��44 en+�)��Nx�U�f'��+�eӪ:�l��u5�w�g�T��D�e#�B��6-C��ڠ�F��j?>jR'��4�-dL�@_�z�!�����b:`�BUޣ8m`y���r�{���(�Nf���@�.��K�����PU��)e�,��а9R�Y#�q�=�͟ʁ�|�h�ۉ A�>�G�z�fʇ��_�u���!�	z����P|��Da�K�R �����`H�YS Q���|8��p�ٷ�1����d�a��Vm���59�֊pC�M!~�1�67�(��~_h��o�f ����2ct#�$��/�.�t���}\$�uH��n�C��]�����D�Y1��wiz��$ �?��������:_d0��qo,�pk�4�d'g�%�j��@�ŵ~vU��)r�d9sk����_�O%�qY׸�	���I?Ȧ�!�%(�x��e^����԰*��L���Y�l�1Yu�4��L(j���}@�}+X_�4�M>�
"�{�$��#�Ad�a���=�	u�>5G}�U�S�b�ݲ]iGC�����: �c�V�V7�"���k�{{?�	�@۴���%|K��4��]s�@�\1�-)��_��3I`WyP
9����X��.�9���2| ��Ŏ@O�hI���9�A�zZ[l1jO�`�_���R8�����#@y��O��~pS	�l˄<`L���B�3��4��������:��6�\�Y��i��t�n@�o�/��'��@7|����(�p�b���Q	B�i#�^�.�t5�}i�����c?[��h.�{n[$L' ���$u�˛�VJŸˬ�t���ۿ/�&öJ���vz�m@�����C�wk?:jQ�7��L���Q��RiD����f ���y�|?��:���>��P�ԥ [��"jD`)�>�t�z�?�)������!���+��P�07\�"OS噖�HA�V&yXy�E���/����>�>ԥ	�lo
H�{,�A�qK���(��\���",2���PA8$-���L_J+]o%-{L����U\� �������W�zD���_�z8 cp�d���5�Bwf;h��I�S��k��$����=�Fp2{1`kP�[`]�S���
�II"���	f=�)1�v4'�)�`&se�6����������&mԹ����τB=��lQ��j!0d!<&���C b���`f;9��Qh8"��L�L� M2��ì�3�4�VȨ�x�{���W����Ǘ����K�����)%�����Ee`I�M[ŁB�ߒ����>��t��H4I"t�m�ي�e�:�^Yn�u�BИ�M�@SB���rCF�6N��W6ls濬h�d�#�ZT��廤2#$Qk�Ta�1�M��Pԉ�����(,|FSB��9�l�[s+#�DL�^�9V-��m�AZ!���N�Q��LKI��vW��B;�K͑k�`�A�MYq[j_9G)����˳�YO�kI��7.��P��3A;�*�A��߉�G�n�@�DjO0�,�X �O;�Vu�Q�S�5�bOd�
8]JH'į��z�|<0J-�WA�Q�*%(���Lf-�z"å���l���lU��#tDF���U�U��_Y�TWz��XGb�m���6�\�����ݛ���$2c�d�H�֚Ȕeu)��A얚1�K}�S�JſJN��N0y�}����TUu���T���Yo�i��`5�^y��@�L=�>jv��Q��m]*�lSw��)�!��Gf!�ޖa�J�c���5�)��	�'4$D�R��	N�~P2�3GPu$)��m2�לy!�
��	?ݶr=t4F)K��
KzՈɠJ*�ю݆N�$$h7���C���Ț���k�L�-=��2?Ѹ0�J|'`�y�m�qo8,�3����9�e��Ts��q���K.�{#�~���!Y���>7��z���X�    F��/��:cy�3�s��d�U~ ��p�;�Y<5W^�E�q��ie�uMXx��tͿ�VM��ǁt����L��7g4���l;�wa����t�Ȕ�N'�}-����L���d�m�6�ڳaֶ�������*�~��~^
��
���S�.�kR� 2�"�Ad�El��r�iO�U\R�b�EQ?B�Z��m���։�����f*P���6S�^`h-��]T Z��AT�-���rWZhު?�.6�l1�
�:�6��\U�&W
��B��M[������q�W�O��z=�y�ߛ٢ߊ�+��M"��'��Y��M��iFR=�=�򄔱��_TUJ1�2Y:��]��@FS���Y6����2V2l�b��|f3֝ �n���%@:_����Gw�䦠�z�;���U2zؿ�ww�8rf��R��;�z�;���R3*j����:\�����T ��)�Ȃz�_��"4d�"vu�1%�IF`�9�o��<w#@(�f�N�繹z�"\�[����������)�̐hHB�\�k� ݐ��� Dn����gAf��WG�p_+۝�&�"V�� 5˪T�4�i5��0u��q�3@����L�9"ZRjމ��I���ڡ:����\ןҟ�(`4fӗ��Cq�8T���jl)�����ǎ̰)֩���m�N���X��z_�Sr}(�)�>b.��pBu�|��&���	�9ʵ�a[��5e�Q�VY��v���P���4&��v�T{�C)uU�5fe{�quL�@�g��xѨ�0f�[��c0k���rг��k6j;�y��:���g6�s%�1�[r�=�)�ѐ�.tq�n�q{Oh�\�O������h2GR��2��&��f^F� ��)��Q�)��, 4Y��Y�#0��|�n�j����`f�3��c�١|2�l��5�.z�^�"mQ~�S�ܨ�1�S��0i0�P%���"2a�0��2\�H;�0q����L%̊�85oRj�1k��e�R��'��u�O���)�E�zr��?�]��ĊZ��L�b.h)�6$D����fV/��r5��v�l��+�1�ޗ�_�u����:�ק�X�>o���e3׮�O�T�Kڇ��e�3n�3!�����{��{�5��
]�A@��r�*�)�#w"�59&b�&J�0��|���0l*�<!�.0��:���ಿs&:�Mpe*c�1��Iq�~3�V��Ax��hF趙�_u79K/��s�Q`��6���/�m�*߹��+��N�j䴂��\��,�qy/��T�g��o��	�4�H�������i�{�.�F�F�Qv�8�)�E@3P�e��Z��a�ʳ��Bc��
�@h�{ؒ���4\�tf� Z)�� G(c6# Nvg��4Tf=D;ل�lD3Y�C�<,Z`D��=���4�=[��_�:����A��n5�XJ��TJ�)��q���L��J�E��Ӌ�������" R��Dk�u�M�4?�PZê������y����W�M���qK(�����I]p�nA��:�Tj����Q�&1b��w���R��l���gn9S�lmB��`����qpG t<�	��Ia(�v'D�)G ����`(��S�iH����)"Z������RYsO��/P��TY5�) ��&H��/{RKBd���z ������"����
l���[���q�C���Ċ�]p[���i�|�	���5���+���`h�VC.�� �o��e�8E�	�&�@qBa']`�F��Q���[{���6j�ɠc,�2����� R|����DX�kچ�=m��%�>�'��e!w���sV��	:Y�JK�0|Q�Ӏ���+��� �ͬ�h$��_���{'����J���/���0��_�dv|�)�|Za03�(>yb���E���_�4l? m��d��!*\�A��gvK��.^�/����
2 LZe����1�h��׋�pS�.M
��MJ����:�L���9��	��K쏞��� �� �P@`����2��\�\Z�[/O�������� �v������������(E�ֿ�4@��.�������]`s��&���a�S:osZt��1�Q��de7����%������S�gk�<-9�ᰄ2���Ck��3Z�bM���ZK�a-��h͹�RGIp>��?M��j��r�6Ӿ����^�ᤙwJ'X��R�0�^~��:�Q<9���&���NYЭ�r ��%@�O�T�{����!9���ͫ�w�
y�<f1�@���?���Bid5�"�@�}}��r��I��J���_a\F2 i��\9`���b�Hk�G�P�>f�n	r�����|B-�~*`��4�5�+�6 ̺Ċ�i���$̴a���Hƫo�P�=3�΀a+�t���<�`+i ڀ���m��_<P[�J�	�2/�~�!'C�G�q�0�����ʳ0�{g� �zd���
�fZtʾ��5��`��z4P�����b_>�(����������E��D�	d@��~@#��~@��!���:�&z@;Yjh04R0�
E3�u��Rj��z}մ�����N^�ޢ�2�n��5ۺӭ�Ap�Ka��˷��&y��U=W����N*�g�������~�1me�fF����3��-e��e[���?VM��@e23qČQ�&����v��F��<3i�J�]��Ы�{��C���s�	�a
�)��<k4P�u�%�r�$�x^lǘ5���+��j%t�20��{��3!�.:vt�ZDG�C-���ƹ�R���i�Ѭ�/^�a�TM�+��j��G�FQhw�m�<�$��D�@�r���Տa��ɬU��/C��\�=Ƃh�@�m�Fͤ)2� ���
P� z�����r1AZ�pR�pTX�YT@P� ��l�&�ɒ�S�}]$��.!$Fb�zX�F+V/o\a�%wӲ�[����z}����T����hL�C�<�*y���M�&;����rK=vWy�V��j"��ݬ ]ȪЛ�M Cyb6�\��Ŋ 3�)��T��o���ĲI�Lx�2�j7�~��D�4��l����U۠t�r Y�l� �7��'�`��N+�ag��sFe�<�.guH�2�Ѿ�I�;�Y�Q�T�Vq�� vţ���
萎3+�:nR�D�:N�ϦJ�9e;�5
ha�i(Jƭ��*�el�� �~V��4y�-������l6N|��9��<j
��l��Z/��B�g�žE�-)���M��4?�n�C�Y��-İ�ܻ�2ր���"��F�e�{ $��5�r���H���s��:���KT#�N�H}�ʿ5�WpWܕy
�M-:YjS�!%�<��0�b/������q�3�1�f^��p�,���ұ�iK�I)��5��izv�Yi�Q�ɓ;���PeЃX�.�5"si�'i��9�b��D��nkw)ZU����u ��vk;Xݕ���I��"��H+~�ۜ��c���!�8B�V����]�0��jc�;:�O����=��|��  ='v��Q��l+mGڳd(���n���w��]��%��U��#��@B�h\Oi+�5i�K�zI�!<�����f}���
j���Y��L�F��kz�p��4:�s�@��;���?��A�s���?	h���R8(�E��@�D�%pQ� �OФד��i��L��9
���~�� ����zA}Bn�T�j T��WE�c<I�C��ϝ����"�_2��^w�ס������9��H�
TT4��|t.u�A��;$NJ� k��l�e�g�%�l+��@�+%�g�k
�&��8�.-1�h=	�����l��Nf�G{�lB��e�:P�W�Gg�oM���,E&��bn�����l
��7���h��+���ចa�P�I%I#d���^J.�tR���L�R*O� 't�:OY1�\�]��r:B�:{��S���b]�?�3uk_Tw�{�]`c�c�\�U"�:�?df}᝽� -��3sU6���oXF�-=�ak��P    ge&���E
��ˌ���E�a��$��S��n� hN���x�Cq�X�ɪ�������+,�xZ�5م�H&+�������_K�
k e��$6&1����tq�Bfs�p��/77�l�2�E1
���P��0Q�V������\�ξ�40Q��W����t�/��桍=�᜹8��"]��Z>�l߭�F,���5�T!�!����h�����9��-�E�?7:��.�u&��Z��8xQ�V�'	�8X ����@K�@��C�2�]�/���|�N �|��Z*�u����p��s&��;���U0�?��啳��?����y��~�ΰV2�r�߼�����k�w_�r�O
L�^巼�R�xD��Y��#��t��s�t�uH�-�*�n�	s��z#��p�mn����ku�ֹ���.(�La���Y6���e�����ۤL����5l�RǧO`�w�A.!U��u�=�f��ަ������>���������h�:%�S�{��M��2:la����RE�m�� �IG�5֦���tűP_�W��|�:������L��]s��j %C_��W��Z��,�� %^��e{�L���Jw�6�VU�q�6�V@O�@m��{Ȍ0�c2|p���w)��ŵ�� r6���͹�����O��x�a}�_��H����|Խ�� �C\�W�r�!UN+?ެՇrc m���Y������⻯w�>daJ2l����G�i;;�#���"T��_��+�����NYrjwf�d[eMf�<��N��~�9�n��ɿ&�ޓE��$�l͇2۴���e�:���G�����x��t`n=@Cg��yKh,��@���/�ys"���t0�ܳ(
���=��Ǭ�Fj�?@���?-n�E�4�>�j�!��VN����|�`
�Q ��V��"���+h��9%T8��vx���.~��A�sW��ho��Y�)I�>H��u�6l� �������9s�^�)�d��ͷ`��i5�Yq+��o*��i��jW�4Cn������$��;lC$��m�d��1�8Rw���v��b$*7��+X
��Cx�>�F�9@����2AdFd��(fC�%���R�|5����)`:����q`�İ��D�Y�3A���fP$VFNiy�(Kh�4�@����f9R�+K#��;��/ؘ�z�}�*� �(v��)L9�pK;M��1�&:��� Ύ��;����/H�rJ?X~�Q˙W^[	��E���9G��Fˈ?�c,��MkiK���Li�m[��jj m��&���a�dg(v!�I~^�3��Ь`��8#��>���E�$Jԣy���努 �p�%�6�Z�4��@��l�L� =��p���t�{�f�N�(����uK!�%�d�]e�!�ufo��<�P��@Ts�,�`�囙р�%�7��_E��T ��
d��-K�*E��y�/�ޔI�Z��X�Ns!�I�!�*ߖ�&�E�J�v,�@S�1x�SZ�]v}���z���rC�)�y�̸Y5�M`;���2^;Y������٥�vB)?�5 c�� h�\������9g��}h*x͎�?^	R^�����߇몺< ���։%��C��s�ͷG���>֝�4w�UF���A�dɹw�A �m�}
}>�����:�Z5��h�}om���]���HH������~��^��2X�O��N@;\�h��jϰN$lZ{X��y�Y_�L*`�E��k�e'%�^�;%�������ˑ�/����^�aF������2$��3ky5A���'4&J�</
�0)�o�"��UP�kuڻ�����EC���f]����p4$����8�Z��a�T�*
������������d���(UQ�<��Ub���M�kuF]B�ލ�)���MHn�1a�}iL/Y�^ >z�N�Zg�?�y&�%5}�qp�n%�^ϴ�4JL�5���������̳54 �Æ��E�9Oȗ��n���XG�1��*@d֒<�nLM>f̸�+H�̨�"�t��qUd�U7o�Gv��XK��&aL���&���/>�nצ�ԥ��b���Y'Y�+\4���4�f4CmLm��yLM{��s�Yp�.)2�fΕ�BN�����X�����f��Z<�����#���X��6�
6σD�k0e�&���z�It���]/
���߸��t��WZ�ip�����?��F_��ٺ垡*֮@��W���.V�j�G�c_bppe7�GiI`DGNs���Д
h��oW��X(�Ƹo.B<���}qϪEߓ�OAZ%�u�vZF�`w�=>8%[7�C)��=�^�MΟخ�E�UcKV}*��,��{I��y����V�)�2�����3��k��Dt��kL��E~�I���A�	h�z�e|6VS���j�!M��P�*�j}ڛ?V9L�2{�Dz+:��}U" �ގ0B�H�=�'!�Tc��aX�عG��4VM�B!73i\�~���ha�3J��84����6#UJ�<h$mf�"�$�V^o�d�.ff��=.GK�*�:jC(���0����{Ł����Q�a4��Yv}B1�_b�c�9�;SH��!�|�fָG����a5�:mVP�@V|�P��������7E;Mc�WiH��b�0����H YB�"8oq��g�`���T�b`�.��lo,�<����O���۸�o��9&2j�J	�)T�5Bǩ��z�Y��m^�7_�p��@խ�?��<53���L�gO>�6&yE�T� cC^�/Oty����L� ��\�?��v����e�.��*ҳњ3ܾ�]F��0�2k��<���ţ6CZë��$EQ^Y�ظIu�8Z�������������#3�ڹ�;�u_K5��wԝ�<��E�h��z��̨�7��p]m+����>���c$~00�"%�|����N��G�y��D�N�/؞붏�Z-�V�'R�\�C�o�:�48�H�Q9�9�-���͊B����VP)0��*�L88/K��\F�\�U[Q'��?#{�!�F�K���ƈ���y���I�N�n����&U\�|Ġ������ٚ�l�y��,D��#H�آ��O��Va��g��o��u(��LB�����H���RH�m?�ǳ\C��6�����)EsTn��c�X��h�ZD�W�#s4���ڊ��4�:W���3�G�b٢G"z�����t֏�#h��0h����L��̒�ԓ�"3J��CD.i,�k��؆8��O#� �:��{���>��?��_=�ʌy��&-��O��Klμ�=I>��iXV׏��u��`�7�j�̱V2F�o^Q�;�5֧�����(s�1H�B<��!�l"��<H��l����������i�9[9q�D�l�Gݗ����y=S&{Iy즲� .�<2FGK{z�m`R�&4��p�0�Ąf@��+Q��L�Dd���}�;��[������*.P�r��r�#g���w���	)�F`ȡ���$&rm��A2Ω�J�0,�T"�rz�U�y�a1�w�F{�:�"w��!E��)�d�w�9�bZG��RLg�v��ې�U���M��>���m.L�[~q�C��]:���!�i�g>&C�y��(�'��.�h�
~� f��o�Pr�١0�j�'���~�N�ML��qt���wI��ݎ��/��2C%v˯�$<K'jp���݄&�A݇]싟�����u[;"*[�����${�i�]���R˨�qH���ؖ��HT�.SL\�Y"x,�D�t�![���/��i���!/�j���3�6M0~�aD;�l���+e}�ND���m`��Y�ր�XlA�a}c�X
��/[�(������o6Ǧ���g��䧖a�H�:�/	S3ݨ�9׍&[H�C�͖V�|�%w�(GɌ[u
���TKq��vE3!N��'-��B�u{�j�̓�����*��.3��Mj����sYݠF�W�^�F�/��6%c�aT�d�-ێ����U��X=�E:�+�Q�p2}(�x���    �yZ$�A��p��ſ|d�bF5�~�g���k���yO`�"�k?J/Gf�[Q�%4���bؔ´C��X����"��x����Weم|�(�"o$AtX�{.�֮��-Y�����Iɶ��H��߼~�(�'��XClJ9���6o޹�}խ"�=��Gx�f�(7��7��?���3�C��K>��
^L!�<>"b-�Q�U}T�ФsP(�n���3��3�E%8뇺��Vd�&��p��μ|�S�k~lK�#���������[���1V�14�t��0�-�ڡ�����T��m��!��:<,�䪲�Qw���aDr�G�R��6{�Lj��Q�!$�E Z�>|/fK<�V�i�7��*��j�����a&X�����V��5R�>��q�V�O��z}����EIJ�U�N㝧��ͤu�\@FZ!�<Ű��d���]���W��H��t��I�sL��oh*mQ�=B>p	Idլ�d�� b�*�8�i���Y���N�����|
*e�$x�<�ؘ��%��LD�6������j�=��]ȡ�|�V�����̞�d��߄��̳�w�a��_��i�=2mِ,rdb��o��g�д�w��lpP�7�aW��%��=�y0��]��,�d����ŏ��^��]%��h�$�g*6�Q���2qR���P�ۘƴV�۪e��Ӽ�p]Bq7�V]�Q��|�.��r2fs9X��z2�%��Z~�S����ZQ~���F5_�p��ÈB�X�&�!�6���[�E:)��ǔb����a:ޗ{���K����er0�9��C�HPEi�o¯��`~� ���hc��g��1�	9$=0��c}�L�`��Q?U0I*�i�2S�������C�b@2m�9�
�\i�
���C|�#W���@��c�rv�aW��	�
�t������$o��y��?8:��S���H�f�L�jRE���h��q�U��_�� �J"��۞DjP������N��7�s̹ͩ��(���nEuX%�uWL%�P�[d(X��9Jwm���b"����I��	2{P��k�ʍ�E�LcR�z�3�
��g�^!b���a�	l�&�Ukω����=Ef�Bp�V�l����cZﻥS�$�0��=3��R�Ǽ Z�']J�-֚�������b#���)�cQ3S7H｝�~�RA�N� wH�?C*���d�MfI�{fIҌ-������+\I�&���Y�Tv�`j��H+���o�qs�=�� ˅�>��b�"�`��%$�`>�C�g��Ge��l�wtY1�@�-S��67���X ����Q$� ��@F֐��Ã�$ʁ�14�q棬b��%�R ���ڿ���������L:���P�æ���$Tq��"C�!6��ڋ'C��ðp؇̒�oW7���Erq��S�xs�j��5�3J-]};
y�=f�xcOx`����/�����t���*��23�*��^��[S9�E�O�5���ɟufE{�$M(4�~[}�y����U��j���/�(?���!0�R��僉��; ���Y,2�R��$�	�a0��@c	 �4ƛ�'`��k��e:c��n)�I~�Q����T�}��2��1�"�_<O'w�\��N��JGI�i�^���4�Xq�����'N��3HtEd4���1�yT{ƃd���%�~��WY�X�������*��Zh����:*Wq��=L<�}r������)�:�uד�YP��_<9z�$W6.����&4;9m������f��Q�ҷ#�,��y�W�T=|��/j:�Nk�y�	�K��d5�s�0NL��!�A�� F�x���iÿGc�5�����ѷ�K}ْ��^�p 7唦�޶Wx͕]�|�n�5Y�.�38��	�k�"CGyPG�/B�%�U>�&[�<	~�#k�1��\EJ	un���t����V6n�,?�Q�Z�= �#�&��!%M����%��,jɐ�M��=͏sasX2��{�����G	�9VS2�P���Ԩ�UU+�*7i���CM4���6WӀڴ��	HK��n�5#N�*3��5���'���I�2a�h��K��,���G�ïЫ �t� ��UQ۟�iy�b�P_�V��l��٤^��<U�eU���݇g�q�V�^PX���PX�H����7��Յ�v��sJ\{��Q�����y���(�1��4�!2��|Fkܳʷ`�9���u-	=�;�J�*��=�y^��"
c%*��R|�=<�3�p�N�'W���U*"�\�z�!�is�?���B�[:�,^]�qXE���8o���iW�2�$����.����!��:�	������b��4���ׁ��pUsz��(�DW�nKB����I�*2�'�5��'����.����P���p��|�����}��R��_���PB.C0yÿ�>:��z`K�5"���^�����)͌�1W$�^w�X�5��RA���{���6愯� ���I�Ms�t}�rI՛;�P�0�b:s=��I �/7a`\�1�%�h	�O�Ӿ��7_F��%���@��QBU̇�>̤�����SL�"�d�ͫ��wX���1����o��� z�t)��W��ȐN8�Tt��i�H�f�S�M��z�tja��y`�֡�3E@�L7�t�U394�� �lo�c�#���J�^G�Z������ �o����T<1�����
v>ᒍ�w_�H���7y�%�*���,,(B��I����EZ�+�ö! 5�狎�{��}A��^k�q�Գ��Q��7����ݍ�����ͷ�=\�k>�=w�� �|���C�ͅ,�	tN���D��RO��uy���W%��|�Fe4�#ݠ�
�1mܼ�-��>�uEB�.�]+mP��˫] ��}�@З��E�c����Z�=�e�����9dl7BG���ø���s��[B=!�*�C�����`f���y��
�>-�@(s=E���2���$佛ב���V���/�k�c|�'��dI����=\��۞���^�"�8,�!t�ְ��X��S_����(׳�R�Ivm s��@KB�ը��Y�lf�S@mB��6��,(�������,oJm�E�M��~��Ya��Z$��*kS�d'@�Aޯ�Պ�/?^�thf��%4Nä����=(��!J&IQ%	O)j>�pf��@�D2ue�6��O�5�^��Z�n������5`X�yH<s����RF�6a�0[,�g�uzm?Fi���D[�N��Ut�MrQޤ���L�g�)C�f�8i0�&��x�m?Fi���Qk�y@�&av`������f�3EOG�C�
�2��Ԇ	3����!5�:ܷH5�p2����v-tTF)	����wY���m���)���8LF�.�U�W������rN~R�Ea�/	N)if�����	_��C~q����{s��I�*޿}�Ks]M�O>y4� ���1/���	��������U�MP����^Y�N��c:�&��4"��|Gg���R��0k��5�"C�p��'�7�&1�	�n;����v-콉T�ET�
Rv�X��F�&٨d2v^E�$[����H�X��� ������Y8�G[!$J���n�I�"Q�|��T�&Z��`�z�fJ���٢�uX?6ބ�t�Ӹ(1똉JP�~,ҋ'�W����yZp}LwXp;Дܒ�-��$s+Y�X�/�6�!�I8H�H�{�i��]�6T�1��I#��	�܉d���"N���[B��=ӌb�g)i~����3e&;�F��NfGo��	�u���ʭ���}|��B��8"Q"�l7�-hQ��!�M�'x���L��,<j��qX��)��8�3��,x��}Q���캡`4�W��6q]��P�.v%ݕ�"�J�]5Κ�꒣-y��"�'�Y�̲�.����w���K�'R��<���赧�Vi��@��
lRݯ;�nz�+����A�����J�72����x6��<,���xD]�7
�I������|�yG�U    ���yb-�^#:��[��Ɖ/�xܼC��^�t�䏽�;�&��Y���[���s	y��s@m�� ���a�tG�N��0��t��J�~��*��y��R�Q��9wq$���+k2�뙤��S���F2��h�}`e�N ���#C@���͉I*� յę8��$�p��|�3j����2�?1����á��>����6O��j����l��&K�T@R�v�ڑu�b�m����Q���̀Rf��1+V!�c%y�TI���N��,e�
3�&_��èQ�;�Vc8r��(�4�[���0~�c�ů�L&T�Ւ��R�x���%��(i�{�:>_k�i���h�Z./�>V�6�Z�x�v�4�_�i��0H�͸Q�ʁR��H����q��M<"Jm��t�yL�������] �	\��#M�N�yq}�[�8 6���
���e���!p�cF\o���� ����2�8��<
��<�� ��\�o�\���/~���0с��SWx�����&��e~��E���/8h��EF(���1�y��C`#X>��'$F4up�%`Ք�D٨�=�Mq�	�E��U�v,�9������c�"���K^��c3����F:�J��m-�h���L��S���~���f�.(j���
NO�3M)+��o��2pXd�|0�����DR���� �6��Ǚ5ʜ� �&���.�{aX1��]�ѐW%	lTV�6%���`sb���R���4|R��8��H�a�;���z-���;e�R��8,�RF9��l �ڟS	O�P#]��x܅ɓA�]/̞Ö(�'ځ�GX�G�06��z8*t]Kؤ�"|N��0�����`6c1k��.��m�@NWns\4`Ç��i�`1�E�G.�[J���.C�c�O-�lJ̷'�9�L�[+fq�T�Q��$�hfcmA�Wd�)%��0ˋD�K�I^�6�������R=:;�!��$&��sW���H�͙�<�8�l��7��?	A�/��ư1[����̠]}�1��ά��C2zPA��O��̫'e	8�����o�w�,0�Gg}��U��?��ɝ�|&��	���i��It$�J�g�_o��u ]JmP����u~Ab�^2Qd@)��2P��г37��,B.��]�U�N��N��(s��t�K����Ǉ�i{�5N�-LRkd9��&}�\��q]�^j��Oƭ�o�Ӎ�nd�������B�㄄�u�d+�����8ѱ�1�T��B	8�"��U.
��ȐB_<)
��a��M\�:��L0���\�`����2}`h#?d��y|/a����"34NP$�h�f	C��"��0�'�h+�KVZ��#�Ae�
H�ô�dގ�,�n$0ZeF}E���Ƚ�&!?W0J�v����		w"�+�vHj��+����٤-��f���L�*�$5��+������4�F���L[�[��IX��	E�?�x�@;��v.�8=���t2M$�̠���l)��5P}��AX�d,;Y6��u��zF<��?0;_+��|��Xs�pI)��m˧m�JA�L+]�r��|[ ��4�� ��T�A��^|x�GA���� �Z��J�TxC D��O�y)����>K���c�} ��ژoq�ڬF�'��3�c �ya��_4�C�d��[ �|7l@s���ڭ[��/6�&�AҘ�Q�}Jȓ��i��;�E�e���{�>n�zH��!�7��$߸�l���U��כ�T��n����0t���.��y�	S���M����?��T�
V��3/��
Q�<�"�7eL��Xs9���xlH��L�_��t��g�dH��lRW�T�'���kՠ@�8�L�ڹ�L��]��ί�Ӽ�����Z?���WE���H.�6�,���Ag��|��>-��O;K��ovq�l�5R!�߰H�D܂#]e["bp���.\b2x��:�b6�P�Hi����L�إda�ܯeb�rS������a��L{N�A�����l���Feqbc��8ţΩ�^�q�%�M��2�ZdI�����[-�ۜ�1j�'��	\7��z��C2ǞݔU�I�#�T&w �R��,�I�A�`�L�,�ߜ�>1�M����c��;�2��#/1ׁ�ʞ�������U�|Oa8g��zBV����pN�0<�E׀�79�0�
>��&z�@L�X8LP�Ѕ7��w�g�f�T���ZB�,|�k)x'��=�\W4.)�U�@�V�b}��7���0�/ٵ1�;H�"5ׁ�1�/�&O��*o��A~W�)[�R���ygd�v;_�eSS�������P�,��uϚ���./��q���d�x�͂��_��hsnXW;o���Y��~a���Nx��*0���f���7���u3�H�+�����	�^7�dF/�_�%�8��t�^�ê��)��b�gX���~�w�M���բ\/�Wf;!����Zj|��{E���P��ҁ�;$�	K���w�?|���"�������W��X.���(u���2�k^(�Y���#"�v��&��d~'��R�*����)�ҪwC�<�r^�ůZ��x
��f�����ɕ>�R�m(*�Dj�w_ݻا�b���3i����+=�A�$�_�y�j��i��͆�]���G��").�:�����>��7y �<_���n�r�Q�}d#�����s����׏Zp�k�o�T�Q!�+�m�R�*5 ��3�C^��CӖ`�05A������-2h���>��ó�����.0���7@���g�t)�P�5��g�@���݃������I@h����Ӏ�Dt�� �c�_�e��xr�Ԫ[
�f˵tХjOWL�W���e M"y`��v��5�h'�'O�%f�曏s�?*cxݩto���ЖL���?��]��:�����./����<3K,8:S>MN!�һ������z�$��N���g6@���&1�XŚD�:�Ʉ����Ma�&�j*w{tru��XO�IK�:k|P��y��.�\�/˨O���7O�s[^ItL1�y`0i?Z������sH�o� D��w��)��г�o�ВRi�����.>�1��f�u_:dC�W�s�$�� G<���e�>��ş4��U���Ҁ�?i��Ο4�z�Op}�'�>n��u>3�{�ٴ��	4�n�!�h�����Q,��b��܂r���e�-�|I�ʋL}���=u�) 1Rx���"�}�$���&-��ì��|��h�@݄)��PAV���?��)o�i����8��3����궇#�bT�u��J�P�Ր�LB4;S@�;8]̓����4�k]R^7�1���@O�K�p_{yĦ��\]!P����h �:�i�&(�l[p�dC9���<��0�d�L��L2����)+@f:��`m�F�2���ן?K���QK�-�L�i�Aᓼ0�n��ŝ�E��H����<>:!��������	�7�*�����,��]��K���X��֞���.��Huٟ0{p�7�$��v۸y�gw�m@|!��}�(֋���`C�٠L���,N\��m�8�h��|i+G���6*��P'2������|��&x�K�qvvD�%:{Z�,-�4G�ɍ��<�r�y�.X�g�j3&7�r�ړ���M�B5�Ȫ_v����	vz{M�w��fA����b���;�檊Sm�֓}@����۳D[JĖd9���!���V�0|A��o,K�0��gY���Ԁ���$թ��K�efB@d�BI��,�"��_�'bM�����}��r�P�h�!a�`<�O�l����_�c����/b�)ߕ8�c_'ȇe
ϵ[��@2�j�y��B;5�e�#v�{��ꦿ��͌�j��y��)���e�?�#�|IH��ͫ�Hj�j����7��PuXC:�eUC�Z�����P���ݲ��(�!��n�!�c\|��Uk�z��D��݂3G��R���J�[4�mҏ����P�^��C���    �kX!%�.ەE&��S}���:1���#i0��A؛ׇ�h/cpʝ?�2h��?�^=�H�]�Z4�a�U^W��E&�ۙɬ��J�R}R�CrF'����Ɲ��V3�Vނ
K�7��>�z��!���/�md4R�S]8|_^q6�ׇlY5�6��y#X�����X��ð][s�$�&��*O��Y]=
��a�`�1�RQۀ&x�?<�
��U9�?j+۝��g"�&j�j��Μ�j7���<�l	qM���,���=��u�)u��/��*�-�����R��Ճ�*��J��yEp�*v��<FS$ʉ�aI�(7�X�EDbL�Sf�5����荜|����ȉ�7r�uo����i�;g���3Z�u���ڎ�1zJ�s14g"��(p!+ě?�0�릅�:*���Fa�lg�U{$�Ψ׼�z'��\,C�b<b�>;8�F�+Na~��(�cLs�Ň��lf�3���b�d����j��U��`�w#�������`� Ef�2�c��L�Vi��@�r����f��:t�u�E���"0mh�U�b]�p�;m6Чr��ş|�Mc����$e��?$��a�1 -��`��mb��ss�w�j&͐mI;\>E�GC}B��)�%�>KK �����2�l�8�7�l�?]E٪��:��E�{���u3fj���P��P�^�%\34��dR|F��@߂Lf!����8Y�X��*�pD��ܨ|i�ِ�Կ�@�ͳ���2݆�$?�':@J�A����ذ9��E�z��#�u��Њ��e5<oEഝ�f�$��Ke~b�'�j���3K�g�a�{Dk�>���H��Э��L|a0X�BF~�1�Ry.P��L'c��$�t!%���w���gG����IR�&�Pж��uY�{�7�@� _i��RT�����4��������z�N#�%3'\G�!q�Y����>�{��ƠÄ�|T��7O"ep�7߿�CX���^`]ô�x����9��Z��ߟ%�b���߆�+#M�0b~Ga�fڱ���'\u�`�kEH/4���Xd�0���]�)���u��\�����i����Jk�:pB����o"�������e-��Ji�,2��<�E��%&��1�&��d�����o��E�А�cZ͟Hrs������@&Ъ�FgJ�:w�ڭiu�+����x1�f�.��u�$V���W�֦&�������W�i��Џ6fR|��[�4�W��r3t�^6w=���uSq��3��B�m#s8ja���ىmP�81;I�\5
s.�<�2X�����2�i�7�켬��8�97�/ �����\L�F~"�l�T�ϖL� �� 3n����1��Dʩ��LA�a�f���1K\�],��:������Δ���aWC3j<��]/M�)�BL�v��H?�\��co�c�u$h^�z�|������/��瀙l���Mss@�M��4/U��B��2
j��L��%*K�1�D��[��7�+~�J�/s�O����+~���� 
�~�b&f%S̶�h�9�-!���K���5ed�m� YY�	���O*�����W��B�>����훯�K��5��\���u p�]�8�B�������V�*�Q�zf�W�m�<��8LVQ+aK���}U�*���%h��@���¬�k�޲�%h=~��>�[�Ճ4N�^��Y�Jи�_���l?-��eVe��Z�$`Iޘ�2\[�|�����U
t���G�{\�`f�A!AB��V��U��}|�>��wU��G��,۴�%U�ۛ�9{Nn��4A��u�w���Z��S�hL��M.�E���}�I���;�x�$���Ŭ�S(���%)�
����$��lV�ݎ�!#�Fy4JB����R^Z�LP�Z!K�btVf#�{"�81+m�˴|α��4�?%���	곎,;/!���Y������z&hJ���G6�R�L:�z�x��@�cPR�/ح�W�5Ď/��
�}fwU��t��A����7��D3Q"�<~�ݿW���sR8�q���\�R����`fG�֣��Lh�G0��
>��!$�F�=��N��S?A�r@ �Q�a�p�ų~�,����$�}g���(�ħ~w$����_d��� �l���y�j��ƫ���}Ō<���%e���F�*�t^l݌�ʔ�A_��jr�	O	��D�豛Ց�p�+<$���}~���X���0��߰�+��e�R�¦\k���G��i�U��p�(��1C?��ՀM���SL���pwK=�EEr���ؑf{�E|�A,[���Ya��-���,���	
��?���ZS�e}NrP������J�ee�J��@ZI0�:2�|u	�=��阐\�6ͻ���0$!S�\QS	��R:��Pi4e�E�p%'��$���v��;vC�g�tDXo.��A1P�8�z�A�@>�4f�y^�֐;%K�>�$Ew����jLD@G�-��`fs��HY�G�E��Mez�ky�t��1����@����Y�
��k��'^�4�+,��g�	X�:�屘)����OzOF�:^:�R���:���"c��+��8"�e&Y�Sw��r��C-F����٨y��A���yC�@����+R���w~�@���vR�B�`�	�y��Hӭ�	�L��>&X��2��{��tW`�Z!��0��
c@*�ͥ�i�����%,�k
:;��S�쯶�Gk�S�y�d�>xB�O[�j�Z�Kz��1�����LХ�V�R���_Y����7�##�r�ʸ(_�h�`���@s�����U�~в�(�"�s���YQXu��I�{�-H�l�A��u �g.�(��X�Y�G5�W�� x󿡄�E,�~����>!����	en*[���g������+T^j�m5� ��tuX�lQ�,��C"�U�.|�4b$�+o��V��%��^o����]�]���Y�(o��d����?3N�8tg����:��y�5�_0K%A��Jj��vYdł��SO�5u��o��l�Ab-�w��o�JP�5��n�N9!������0����㝵.���o��A��J}D2����GiV|�,'�ѳ��JC�s���.�F�X�|��Ha��*�3���1��,}�p���B��wq�F� �+��$��e��&����������[c�?3ÑhW�Q&ѐ�ݑ�޲{�y��?]���*ިgq&���ԍ.�d�/��t{bM�b �N��5�eȰ����D��?�|H5p~��ܸ
P���;Y�a� yLb��*���l4l"IC~Q,��T{�ȣ���E�h�r
<��5�vu��g�[$:��N���>��o5�� �.�(�,�(�eÆ�@�����Go��|�JbM�kÙb���~fK���hA-w��{�!C��Ag	��6�Qh1��s]w�Ah����u�9�c3I
5E�\��s�U1�"����]��O.�Iq�8��ُ'�G	�f�)`���G\��NKY<[����Xb;5�;�'����G�o�K��)�.��M�Z�xTP?��Q���
�����*f� |1ܜre%��ْ���Z{-�P��)_�8Ư��j�5,�<K$Jx�A?�V	[^kL,�%k־B&���;|\��Q1��j��9�ʚ`�����M�ґ%tt��:�k׽�V$�{�Nh���wJ$��h����2
lWgأ�f@�jR����������0��"���q��0i��b���s�wK���ݐ����>@��&�ґ��m?�[��=�S�c�j���g%�kTuD�
�~���7mx5��\�qU}�����0�6v_U����5�.{�w.`��z�z����z��:n�CQȌң�aG�x8'Ǉ[�\%]�Z��i����[�;�a��ǭ�fZ j'��mv��V3�q�+�f2�W�:�m�s%}��m@bv���]��]Yb\Kr�p��h�:�'m��NYGLgX!=�d��;X����b�%>a"p�����r�&�Jዜ�]�;'�?Jy?e�    �}DmF>[��Κ��@{G�@G�@�58v���kcĹ_��
�;����f��2����/��g�gA91�Uxp謀{pĽ�'��x�ܱ�\��~""N9��7�A�L��QZ���"�����Q)�l�s�j̤}p���T�ږuFv!F ����G4�Z�JF��46�����i.k�Ճ˷7�l)3��P�1��g�m`<��.� �ݑI�#�sG(fI��T����M��Qf;�"�J㓰Yf�{��L!�+fܬe;�LD�1;Ώb�4���9i�h(7ջ>U�
H^��L~d�����%&H���g��y./xy��[L>�?^����_&�r�?��,\O��f{�lϣ�����ٸu�EDyU�F0�a8��+��gM�Z�0
�|��ywy�6*�����
i�rP��N�a����c�lD�lh^��:�W{�׋q�fޙ��H8�G.c��c7M��~k�(j�FZ@,���ʨ�켌�1y�95�U��@��T �q����V��,ط�E�u<
�2�����4��h��W��sNT~n��|6�����gS��Ϧ"�G�ME�O>��\�]�h�����r=i�s�z㳯�����j��u�T�k�>��	Y-�����Y�)��"�I�`�����E���r��IK�DVC��]$)лp���[�w�G�u���ڋ �0���;�ȌҶz�$�#7��0�P�E���0���s6F�����f�f�����Q�}�\�$#@Aj���/AC�}ϞفRIn��F���=^(�l98TA!� H;4(�H���)��̿="�JP��T��j*��G>�����C\��UjX_��ӹ�ə�&^\A���gg>��s�P�,��2����d�#��jM���0A։��.<�c|��<�&(�yמ�C-�������x\܏�bC�sz~����Qu�d��������KJ��AW��$���M����A��0���ݛ�I�pp��[�)�՘@�:�	z��88��&��rr���gIp���f>C����CId�\%�X����X5IG����5���@�A'�@�.���w���I��!��1�Va#�1's��V��9C,l��d(b�si ��"��@q�D�f�{�9��-�[�H������dl�������~����2&h�..= �F[�����m y����[�G�(;P��H`-�!_:��$�J�{����� �Ҷ"�13�.pbSׇ�1=�a���'���mk�ꜿ6�B$wP(:���������vͯP����l`f�O9�|�I�� 8$k�}�X�Z��~Z���BC�z��y�mPX�YX㐵��~���oG�rg�R֊ď��qd����<��~7'q�G�p�	]d4��f'��
lS�P�P�V��C��HP�(�"��u�8�ȁ����G�C�����|dXr%T�9��~��X�!�5�l�m3�)�c�+P�H�a3�2��e��+�˼�C؜��₸MD�J,1Y��q�h���֠��b)ZE� ϭE(7��ca8
�C5��@��
�1�|¸e.*76�8ٟ��E"�ͤΫ�ZN?�T�'R�꠰�� ��I���U�dc�XV�P8�\#s�tZ�S�Qk�\��r��«�|TSC%��!�vjl�F����)2�	��c[��9�ߢ�&Ѕշʭg��1[M��ۜ��:	2-Yڅ��ۈ�v�=��V�g 3����Dʕ�D�T+u�zƽ�	<֠W��%��%a�lW"���a����=	l�73�N��q��P�4��$P�'̨ i�%�Q�0ĭ�W/JuV���7��L�@i�8�"���#2���Y*v�P|�a�1=�O�f��< ;��҄�G��7��O3r~)1��W��FO'��a��黦M[M&iB���g�"0e��m�DlE����V$�M�F�ES���j�9��J��E�=hk�!�v��p�
����K!����'"���L����b�ֽ��xR��A��kj�3���D��)ԥ �tU�Ԣ������G�� U��O4�Hr���o O9u�ۛO�)��g��x��hYK��4D�/-P�{{��Nhe#)R����A���5DG���k�6�t.ڦXC��!��@�'���/�6��6�9u��Z=���������d�	�g�U|M(���}VtT�o��FL���#��z�}��M�؂>��T�I�P��E���4i�d�����Έ�M�vC(�6�l���A�\�L��L�&Dd��_��� ��	�Q�ĺ�H:��Hn	�A%T8Q	��p�����w$��m�����x�y�E�3����"�Q|��/C���9����b��&&���ό\f��I9[*I�Ƭ@6��X��}8DmF�	Kp�q|S�=%�S8?�DN�mN����XD4*/�3�0-��`��o~�B�d����=7/?���)2�r��3	A�-�^�Pn?L������"D 7�X@�5gQ/�����BrC8��Hn?��B^�[�rG�41b�&!�oM$�[��Y�Ӛ�e�k�͡��Brs��Q�	:����Z
��W�z ��Qc#Eu��C@����7���.��e@&b��i���DC-�B��_�̶!,Ȉu�;R�5�,0�4��!�'���j`�.�] g��5�������g`~�uo���P�&q�-a�9儉2��Ph[H{�����J��&��?�ǋanE6�ﰸ]�p<?_'u�it�$�.�2��Z2���}Q�}�=����3���E�y&���\-���++�fm/l���I�#�nү�l�}��74�/�>��/m"�m:��eC�ɚ^�G�u=	�b�e��&cQ�����y��@m��#�v�0��X'��G����+�ư�T��R�R�6UٵZm)��촙�����Ml�N[*j}���L��Pm+�v"|U�_m���"��[�l��?�*�6s��@y�fJ@�ևa�B*��0!"�l�S���w�j��̀p0�0H���]	��"쑐��W��.��	*���U��rأH����t}�������;@���;@���;@���;:���LVl;��s.�[��Dd�C4SN�Ѹ�"�ޒ(��+<��A+�=`e�(��j+d񳮖"3xռE��}����k�N�@ �PosHAozS�9Jgwj�!�������K��>%r&#�B6u����l���X�P������(3�{BL�=���վ��	�kE��Wy��#���Dw���"���,����s�EZ�j�h �O��<sI���*�p����gEڬ~Y��5���<�B�&�q��{ID\�yW��`=Ջ�K29���]N9�[�WA�b��n�����$���6�{V�j!�G�Ha�{��D�\�Hitp�0�\G>����D�_�=�?���~��1oֆK,j���P�Z#D�+m��7�m���QS�6o��ZKR�� ;�9���a$S�.lƔ���R/�*�l��v͟Ө��ܻ�G�j��q� �b�g!&e���
�5�|�V�m�bHp�������\�,�Y���({nҽ�@��9K�D��������A�\��<8��{�۝���<���cY�J$�X^]Ȣ��O�@��U�a��M�B���P!�zW��t�rؽjtp����F�
H=��6��U�/�HyJ��v7E.�A��wPK3��-��`;M7',kWq9E����Y��35��	tr�0P���(ǊP��u"g�&�_��6:�LC�j�A&`\ ��|��Ճ��;`c)z�p��~�hX� ����dg6۞HgGE���q=C��]g�4<�i̱����a'^�f/E���ㄸqvV�A���R"�V9-��:� Y*J=pŦ��d�p���#6�W�;P���<:8�R��͇f-]@��a��A�Ԫ=:]l5��@��+�&�7�.��gyW�g  K����'O%AyA����/���+A
e�Q�A�K�ؑ��q�;��qD��u���۷�Ha�    ��c���D"�z�l�	_H#$ރ�M��*�/ �({�d�`p��p��p�������O
^,�e�9�l�	�fwp\�"%5���ޮie��A�3����	�}ж\`wk���(��-�-��I�\����=8ݔ�2��i�Y�Ι��5���7_=	��!����
�V��f>�by�X+��4���wE�)W�r��Й�V��˻|���wk#�n��3&W��������q��%Q A}emhg�Zku\B�?k(5Q.���[��Qz6�~���g t��U<�6��Ŷ��'}_E��V>(�q�AK��2`�C5�&�IQ���7�]��pאۤE"B�����"Җ�x]
��t�5&Bp�{B�� ��*G�V}<��\����Sr}��)�>�qe8A��d�Q�ڂ2d]T��y�X�m(_h���YW�T�)^��7���9���/��?���Ͼ"�;�}E��>��\j
�1��a<��$�5�Te?F�����5���r�@�o��.x���s�2�~��V�+
M�����������"Į��P���!-�&�^�����aϣ�Q~�0�K?1Yֵ��Ĵ/�A��Ť�b;�S��#�B���a�"Km�>)���n���[�ɋ����@�Mu�p�0�an�%ָ����фv�ȫ1���S�e.ja����(���jZ{�����������O~�^��Kb����g;�.��i/S���3��Ǖ�OK�et����gr���C����~���g (�PYQ:���,I�D!���E��ꐿ����iA�[�$)��?"������&C�K�=d��=~�4��2e�w/�؍���OX��~z����γn��n�'�� ?�;?\k�$�x��N�{���y��eS�L/2������q�Y����;�r�d�9�Faiy��S���:�MFMfI�?a���L��p���ǻ'�r���ކ���9���mq��s�����\�WgX��p��y@KFG�D2��ۏ�(M�ix���p���]ɸh��������Υ9�*M���W�N("M���9
����C���\������]т, iZPn���$")�~��4��g7�����)��)u���?��?=2i���u 4d�:��z��	s��T{��2F#�e���=�_f���l��x<�L����7/�Ow�x�l�����M2�E�(�&E{�oD#�ɐ��'X���U��j����P��`G�Z�T���b4�����I@3 ^��؛�pg;�:d�qo�kWu$:9}_�bڀ$�:��qG,2#��['899����m�o�'� �x��'� `yN���6\oV�����������COF�:��AH���� �4%�.
~�ȸzW����	�>�Y7��ô�=`���9i�P��U�M �ʬ��6�G�e.^;�:7a��A�ϫ�;� ��bz62{�c=�ӛ/�y��������:"�\5��]n5k))":}ZІ����E�*��[)��o�(1�\f��V"m��b�j�U$������r�SP���¤%�&��d��*��r9�*�e��/ȉW���P�cNEP�S��?na3�]� y�WY�I������t�=�I[��O���;{x)�f����+��J���E��+����*�)*�9�U����e]��b�Uڮ.��q���Uڛ��a�w�9�c^j"c.6$���tp��8*2�HpV�*����)BS��<ٵi�p��k"�1���9&��$�[�z�� �v��G3�
�9)�ؿ-+u����1����~$=���o��9�vul�/3ۦ���|�z�_�qE�sB9k�Ԕk�W~ [s�l�9�A��oZ�VQ��՝�k����12�����e��ꀦ���4��~A��޶��V�Y��,)�ޫ������Z9>,Y���T�$�A{�XI���ɔ�(�:�S�5 ���6&�Z��y!5�$�GIKDC�ui��2}�#�/7��,ȸ"_���<�t��P�r3'?*�bֽC�G8���yE��V��ĩ�J�;�>�uJ^t�ZS^"*��OjdC�͇�GH��/!h�{ʭqY�4(�����]-����>�|ȊG���_A�� ����MH���DZLo�

��|��s_�R���HtS���J{���E�VqԳ��Rv�S8�[݌�tV*�J�D.��]���)�m`Ѝ��Pl�
��$�S��ә������R�h��lN���u�n)�l
쵥�]�G���^�Fn�ʛ��}v۞�n�m�2��\���GC��X,(HgC�3�J,�Q^G:h���Bm�0� m���;��f`��HӉV�)�3f��d����ƏV��jfd����d� � +����t��UH/q%8�RAl,{%�s�fU��(@���V��N�|�5��iIZܒ���ԧ�y��^6�����1��Lu�w�Ĉ��hʛ�M��L�I�R�%��Ӯ�Y�98��./k�ܦ���߅�]�z��W{X@O��?����6���kR�X�1��0Pqޠ�`���0�ۛ�@�T� �Z�����H�����`��p3�8Wfa��d］��y ���s\��ʽ^o���\1���ܥ���ܥ���ܥ�z�^s�䘛RE��2�,�I�"Q$qT�����D ����ξQ~�� q��K�<�e=_P2!1:���Q��,D�z� )� N�}�H4(�	��zK��SA��($Bz$z��AU	�aB D�`R�(���t���Gb�7�_���M��AY�{���v�����R��)�"�{� �7�s�N�
�]��/t��w@[�%��&#�w�����xS�/�̌��3�:?��^�M�7����fo��p��B{9�P�TX#��S�[9&): rn�s����(����`;� ��t�ܭ<xyJ�n�?��3F*��l$.U���EJ�7o�� m�Ͳ��)��f|��W�;�A���HG�q6A>��>~����:G��:��[<��E��^����gD'Kۺ%Q<��tE���l�W%p�>����re��\��x})Wv��5����eV�������-�&]i�	$:�N��ލL5;�"ѩi���9����P��!����"�Ͻ !~0�S9�V�(����0T@[ʏ��T�\�6V�g�G�C�B>^̌(�-�N߄/�_ƻm�7�b�?Q��J�A���m�o�(VJ#�"�<��5�!���.����쥡d2��f�Cp��l?Bġ�~Oj(f�}H�>�nuG�2څ����ق��7q{��9 n��ѯY�d��mA:�Ӿ�Ȗҡ_`�6I�n�`#:�e|�G}���|���w0�a+b������d7�|�A0�N��B;C�r��3�s�@�9rK����5�uuU^��]���S��ͳ�\c���I�LIkW�zk}~ypw�E��Yd�V6�,���sl��&d�R��g�s�(벑ʶMF�1چ�45d8������a�:�㶹�~iu ���|�� �3�-�"��0\h�5����Dg!}�@W2�tM���G����'�e:��]L�/�-�s�?��`m�M8��8�Be���Hp:J� գe�(�B��#Hb���Az~!D�A����ē'r�d��
l�i6��q`w���Y�ύiU(�~� ���X�J�,_2j�p���AӖ�����$v1c���9���,?=J�<��1�� hE.�W`�y��ס���q�ZE!�=�=ye2v)Zl���'�̼�s[EI�d�#au��@تx~���^2_��8���B��w95���T4�$(J������F�!�� n��2��z�,�ǜ�ڎ1�@˺ǝ��t6�U��(���X����H*l��XM�M�d`�qA��༼i���O�	@EE�[�`/�"��Au�v_�h�6�hv�v�-����[0�ĩ=��f+�rw� >ɪ��&Ŕ
"Ѭ�Yn���-��r����-�    }X�>�r}�'r}����O"��R��t�z������>�[���\\ �^���&^5T-������A�9/�,ѭ��,(��*M�X/�#��$��Hvq�A�s�1���Px%���«8��BS�E��-2�"�����%gd���� '��:n���۸X�g�eMHkS�ƆG	͘d�H�}\:��Q@Uv�c�D����>T���!���j࿠am�}f����j��`�������E]�^3s�Б��S
b��àƏ"ٰ
�,�?��`l��L?Lq���1�$m�U7m�@EW4���*��[{HG�e�3c�)AhmQK���JFN�@����r�(2i��
|�V��d_�?.���7s]�Y�u+ �K*UM���aJìCn�l����H��ds���\�S-�h�	�«�'"Ӹp��W�z�;�����/�r}�˳\�r+�!	|�pС���93�6&0�E�%5�Mv�%A?`�;��:b"-��QG(����?Mb]��M��'QaSf�	4�9�-$�����&1L�;c�`���n�N)M�I��vu��r�<�S�`�H���l-����9��	l�Yi� s�#���*����@����A���?u��h���s�1���(�O����߄�ش8���\r��{�z����S�-�p�:�1��55qh��U��q�7 �=�H��ŗ���O3��]A�w�����S�*!�
�g�������~����������x/��Z�o�R���_??8�}�X$��ҽL�-����6.���L�;���4�]�����7��y �v��,O�އ't�>x��6!3�}�-��K'j��6BP����7_m7�I7�Bş��ƶ,���z�+��h�b� ah���˫��F�.�<a�yU�\Ĝ�o��E���.<�����{Zؐ������߄���d���� � �x���'v�ChF��f�l��R�N�`�Ǝ��6�f�����)tM0���.U;���~p��n��I�Nm���e��M�>'�Q4�q
^W����~�6�v��ǅ���%�6M˼�)6Cw�k\��1�6��޿ ���#���
��		x'��b�!$7x7��u��n�]����������ǻ�LG9-��P_�_�R�O0t��"c�=ao=!���7̫�oo>�ˀF�r��lag���������+�=�A3���[����f�v��Z�H0���tupϫO3��u�b׭�G�����M��*
����[;���@��Ni���-�>�>��˯
�y����y i����3���Z[����i�;��,I�k�����`H�j8�*�И���?��4���.!�b����&S9�n�>��ʘu����'�F\pN7��	���U���Gr"�l|�'��eM��ZL����#4 L��^IԴ�~X�z�����<(�$a���T�� elx���y�f̹��-*R�4��Y�Z���x �����\pku��ˤ��{�����<�Μ�M�Ղ�$�|���W��\��,]-��s|�Z�-�㴣~zC�P�v�oTo¶y�_�5�sav�����ư&��7E��d���	̷���V��O>�9������i����	=�6�e��H-�揶i�f�:t�ic����"071���Ϛ���g�v�+��4� �Ĭ�t}���%`^�Y�A&��q��̿$���Ҥ�+��᭭���e`�5���(��>�,�s�9�	�a�e��m_��h��5������J��ֈ����aSE�ɝ>�i�G�I��ii�[6�$��/\DCF�
n���0J{�f�fβU�]���&j�f4���<lt	�9���Vw}a���3�&"��և����)�`��4�������_�W\�;.�}�q�gY[��7� �L8i���Q�����@ͬ�_�槜?Dl��N%l:�y�P`���~�Hg���ka�����_�ׂR������ ��v卉.�R�l�O�I:nj(ӓ�3T	Q�C�>���)�CԦ\Q�r=�D���RO���e��m�Q(xc���ջ���%ջ;:z����C�# *i�b��2Ĝ���i-[s��xB�A�\�z��	^?�TȾ׈L�~"��Y��`�&(3�d�G�������Ru��:�VP�����j�BP��pΟ���Jp�5�jk��B;O�;"n�Es��P*~kb��Pd*����[�5���lŴ�������vyr?2��0'��8NBK*�,�/��H��X�����J�O4���ր��t�r�~�)�d��W]�IR��m}�e�e�m�j@�_�"]E��S���G��wE�5��Jǳ���\:B���G5�{�A���ȝ-V�T��J�aB��= Y�j��؂�`�lS �r*֯W �S1a4�fI��v�K����ć�fK-��,>�u��	t :^��u���4��K{8��f��V4�2�M�\Ե`IH茪�i�s
��L�.����v,�"l	Z����Q����f��S���9��¦��K'�W�xA�u�)Z-�����gd!T��"�Ԃ8�:�	�dj)�ђuP�"pP��0�DfĤG`��ֻ{ ��jwG��I8gM���ʔ�C��%�p�����yI�#�r1Ȓa_��'��"�spRН��F�Ǩ�#s�O�k҇����k���e��-G|8�h��.|��.�`��B��H��e��%N�zǼ4��Q��D;�F�V�V9ҡ�QZE4:��G۝�l�;�o>"�3<�c E셑���� ���ܓ�?�4����d � =�O��~a�����w�����vO�8o�?�����������8a\UlY�wx���&`�:'I6�B�Mx����'&�vu$V������݆{r�<
����_G��X���OJ'����O�|�&B]��.�\��us�qY#�w�e�#pS�M,��e�bq�s�/�tkӧ�ȦU�v�J���N���0�6bR�߅�2^��%��lF�E�MТ�� ��߄h���gOo�R��
�E<JZ>�W��U�f$��m�]��>����M� zEGذ�ڷ+����쩅b��+�3��NAp(<��H�?T�i,n�5&�ӻ��\���k��"�ų/Y���t��1���x=gx��Ť�K��3%e�z�X/6�ˈĜl��������S.%��4K��[^�����l���˃_��N5u���z�nA��j�������P��DeOBb���`ub����w�ou�@j�'Đ#{��E�moh#e���+p����n4��=O�Дc�$�,a��JQ��G��lģ�=IV�e�o�v�`c�&�}$4Ƌ�-��B�CeMጨ�]�(���AEH:6�|D�����*�[��?�se1�S'4��JN�-���_�m^�Ҭ�TL�g���,1�����W��t:/?�M�YO�ԡ��+���C�1#0��Z�Bd:i!0R#��1�ra�<�|벋��?}�]��O���.����-�vu5�.g��:[�y�}/�	��n��2IYn��4Ȧ���ޝfy�D�p-+Ls��o��<F�1s�?�}�`��X�1�nuF��v�f�����0�A=Zq�x���O3��p��o��^�8_\X�����J,��(-tW�ܜe�U~�0�d��_���6W�<����v�Y����ʃ%M22���sik"ˈS۫�W�B=�vF!B�����52^��U}�C�[�]��IY�%T�U��c��$)�_�r�T�{D���)3�yoAcNuZ�w��������e(�r!+��P���>�P����
�Ɩ��'{R�͠�&���+t��q�v��l�UD��U���:w����J��P�aC U�� c
V�� 7K(�yFh��C���nm���y�{~q���EE��nlS(��c7���M�J����9��O�I�J'ڬi�Er4���܅*�"�tR\� �d�{<1���ry�f��Ƨ    ��*�"Yߍ�B�?�D=��5��󈦩�1l8�� ��N��&�(������0����q� ؚ��o �c��@0m��QO��Ѐ��\\H� E�i�e�x@Gz��K����̊��
K�e�=���� �l�ߙP�%�P ܙ��@o�V����n	w"�UGd(z�}�S�脇g|\N��Ŧ.��"�@i#;�������$a�C����jW��R�k)��zbcfqJ!�O;�:�ױ!�|��0���)���@�M��QY�A�KI�!y{�.��7_��,��|����D�8ג�gYP���$˞������W`��k��b�Ҋ��@�_GJ�~��o�5>N�)�+�2��̓�!miR���ƸT4�Iݯ/�f�G�Aӣ���n��8T����A+����+�?���f{�2t�7�~�0�"�=c����DS��ĝ曪L�*ݼNH�]�o�݋̚��z��ۉ�A��l�"lWoo�?�vV��7�O>#C������pe|ߏB�\��,wN���rMtf�#8D�d]0tB�Iϵ*�E�x�����Y���(�Ȑi��a��?@���5��Ԇ�)1��7V^�ꔙ��(����BKŖ t^eX��?왞��&k)gS�x�]�
<f1Q8�]�3���ھ|��K�	���gͳ��.̜F�����L9���#M�6'h�����̋�=�8����[oNpA8Pl����F���6�I18-Gl���?�*`"��c@ǡN$��=��)e��ƞ�+��Z��B��D~�&^�W�v����M_*0dh����1�S8x*�'Խ�@�'��%a�[�����x�Sy|�[�5���'&�����l�*6%j���R��VM��WS�B�[L.<v��D��Z�K1���b!�&U���D�5҆����R򹏟oT��itN���ğ�Vw���v�I$i��QHg����S�o��I���]q}�@����q��=����"[����
NJ�}�4���a(U����LԿ��T�,�?�\���&���n���54���U������t��3%��a�����n�uѽc�pi8W�ֶ1��JZ��Ot��o�}j㊁����ܐ�l�,��#�1g��| �������C��D��ryX�q��t����7��A��'I?�_����{|~,�~���f��!�9�9|q��<ￎ,-z0�q��`J'�Y�8�P9�fg8��Zl������ecR�(`ז{��"ka�81+M����jo�����$m���t�!���=������Q#��>�"t�	Z� `4 �K����	&�K�: m�s'}�v1����=X.��%�9=�U�6���+�ٻ2��3A\�뤢�
���w�h�VU��.��ۇ
�z����=���!��^5"j	�oF�#�gB�&+iǟ��8��N�7I���(���O,��}~S/(�"��VO!���XX%	�`:���X:��J꣉X���=�uq�L;���'d#�S?�T���[&�mۛ���/�Fc�,x����i��"� |\}*(Gy.�YG��Wޏ=�w_F4�f��&��D8fX�թ�3
���n�&����S��OX�������#�k(j9e�x�B"4�L>E�z|� :fm��2���xf������ؒ��)�����TA���з}(Q�98+~v�_R���o�6{�/�"��_�G$�&��Q3���p�LnK�YPƤ�y�Mex~:�a�z�ˏ��1,��
3�J�!��CJ��о�I��~x��|�D�5��~=%����VxS2&b�B%�z������F�tZg�OX���������\�Hۼ�R�B)4�5�ˮ#�j�V�Q���N���y���y� ��˃2��JP����
3�7�GE��^�t�h�8�Y>Y�R���'�?eșf��>�������3��G�Y	RDsӟ��~_"S^욤�CYԉX�*�\��'AYw�a��iL���]I\r���[���@�L�Y��m��ⅈ��a�H�Ti���e;�f�=(~������p`]@(�@D%����I�]�Ӧ�?l�� �7z��4�.�\�/�'tg�zcB�8z:2o�! � �����z�~ْC�ܐC��V^�����6�Y�{l#h��H:��gnG�Q#�av":��Qf]G�qv�+S٬�ϛ����*�>��SB�uС�@GB�������B�V��ﴑ�YqP���i"��C��*�M-��-/9Aq��v/c'Z�B�U6g��P�Ud�Sס�a��B�K"��]a����iD�x�ÿE���]|	y
�}�B����s��Hh��
ع�F׌���g:
7g0ʖ��j`R����GY�O�Y�)�&ɡ��O��t�	4!}V��D.3�n1��#߹	�p{ i_�M9�y��p[�w�'��d���{Q�{��t�����w[1{:wfŔ��UF}�'���J�#%ƪ{�z3as�$���NVɱoLx������zǧ��{:�J�Z��[���U�Ha��J����/BBC�\��%5e'���h�K���bf>W��˫�q?��6�~�"�۰^��7�������j��x�+����:�34G�`���:����+�(W�m P����Aج ]�S[��Ж\�eePG����#�T^}�һ�s�>4�����V'��[�l�G�y%�?���u@	� 2�Y�Ҵ>�6�ߢ��C��v�O�)n�s�s4�)M�a�H�	�_�҄���+[-�U�\�3=-�fR?.�}Z��60v����XϞ�7�ѐd�ڌlAƽ'��	�\H@�!3�ҩ��@���g#�5�+�8��+s�a�G�gDt%���]?��r�|V��o�D��M��1�i���}��e�m���ìo�PfEu�U&�ķ��t���D'n�'�u��C����z���0U9b4�acb8��9�`�����:&�i�T�N�n�Б��?`�
���y�\t�,��p{w�"�z��Nz��k\�Acm��l���L�Z�u$Å\v]o$ԬW&j=���mv�!�� JZ��>O�b�1l0��.8����w���2,�\�������1�+�G��m-�y��2�B���p	�������ob�&QC���{J`d4�LGO�nGb�����K�u�{&�܅��+w�27Ap�3�mR�i��v�}�	�D�޹�ۀ৑J���9V��B��3e6s�q7�[V�`�"з��x�DY���|�-ÿ���_$�u&��d���k�5�VD�Ҥ�܂������ ��1d���ĆuuQː�o*�ez�;�Ed��à>�f6�<��>`���2�%�9�<�UG�qP�CI�pׇN��(������W��i���@��w������|�mȰ����"�����#��|����m�m]fY�?�b^�O�? ��8��`�"�q;��g���RZT�?��b]��t7��,��X�%� '��V�yE�9���+-�>݋}�B��R��,G�j��a�[��1B��UZ��@�ߗ��$K�\T�ґG� �Ҙ��-1
�a#�iʢT�R�I!*�pµ�<�B�`΂�A��y�WF����q�#�K��Ѵ3c�l_�>��8���`�� U�ٵg�:'Y@4 Zp/x��p ����5!�T��zW[K�`8'K� )�F��wt,È�0x?�͙Q��H���ɔ'u<gu��)ڤ�I'�9��Tw����䨊�'�<�q�'8���&�x��
�N�qORsr�}��".C^@�JI�ڣ��9�o\�I���&<BI� ����E	�LU�ԧ�`:��n'�=)1L�Ґ$��Z����O����P�̠6�-0(G眻�Po�����6�ȱ�Ђr��f��q���O���p8�Q�\�	k4���ɫa�tB��˃�
�xβ;UB�U�F���j�#V7�~�k���*Al�IG�B�z.H��n�Y�|7!Բ9kS��q��6���/B�� �  �m�fF�Y<��91��љ���	.8GUZn�߄B�PLl�	�[{�9}*B�P'��3I�[���F}_r���D&KWl��IM���i���x1؄��DR���[���f�����70' �L/vq?����5��H��!�1D�9Ayn(o�R�S��*�.�ʻ��ym�f��2�?u9� m}b�@;M3P����I��E;�ґ��h�qCY]�S���~��r�o�la�%m�"mb�<���栬�!Ӂ��=B�5_�ZR����ȗ�N�̱KbYz��w��$��(^{���'��b�-Y�(B�Vp~��%6/��c��7z@���1�Ql �\��77Fd\��+��o"�2��7gx���E�0S������^E���w\��wº��RG�?n��NY�QDnM�Wi0[�K����t����Z�P������,-��>*]�kN�g�ut�2-�W[����l��m|������
��	L���'HB���d	Fb4)��_��6�����i�?�r���H,�p��O:�8��U�;5V-�-�VR���ú�Љ��H�L��_�"�U��l;uĔO�%���:ù�N3�}W���Dh��q�w+lpG�ԃL��<�O�&N�[�:���I>��t��(����h�����1�O�C1A'���_����4PvP.�,�N]దL�_��^s��	Ø��"lL7�!���3���0�*�Οŗ��?�l��EIh�D�Շ�C�q��o��s~���6"����U�`R�󪒫(Ԥ���ˋn*�}��^����?���i ����RG��o	
�"N�Ds����G"3��D��u�*�i]_�q��9���l�8��D�.�[�[��P���A�P�=J�aR��cDT��l��P�6R��9��Llf�o1&*[$Q�Il�|^��F1��a@��;?u��L]q+T�>��)n�n����b�#�uG�I��L��(�V��pYeǽ�Ր.�jM�J����ݕe��n�2aS�3�˴�Zy1�2~�°�[��5����BN#�'�ݞFV��X'%����H�D����l�=�<"�ph���H�ٗL�L�ܨ���!2"�HN���a3%�=�<�bRl{�����U��i�U`[x1��ɕ߁���~Øa�3[{���aȓ��BX��g�h�{HV���t�2�'NiB�ڪ~�o*y�m�6���-"4b���Ң���N�	#�!�	�CY�Ӭt���(�2�� ]d\��m�-t.uT�n��^p���	5Y�N�gX�KO��G�ڏ��!���\����W��0`$����/����jW[7���E�����"�y��aE�>k+?K�Z�}�2��@���%��MLfpO��̏bπi����H3⑗?E�VǗ�_'�@Ǆ�m��V�аfG��&������o���'Jb\���ˏ�1Nw�a2=P �dsȤ`����s�b��S�R���kk�(nI�v���D[Z
+�r���W��r��q�a�^���X�V��t��;鲟Tf�s#��p����j(�8c�<�1ӻuW&�?���T��f��(�(�?�U���B"�T���U��o�͔N!;�.
�+�����U���q}5KsX���d�s1W��@�����v��o��|ꪕJ�;�Zt�,���k܉�E��x��4��9Xڰ."��'�i���]�\aH��ͯK���f�/&�=�:n�sJbkC��rd��
s�3����U^r�p�x@�����m*6�*��\��ܨ�*�٘g7}��ܖ��P����($G!7R3��>�ԑ��A�_�l�;�Y���ٯ�]�$:
�8����b�K�˰��V��L5�~�����k������k�2��,�c���v�ؓ�Y�R.�~�ga
�	��К�ЯM�/���X6AjN��5���hƖWJ9�W���ߋ=�h�_�\�ńG�Í4�
X�����eEɜ��3̹X�H��.�ZjAYG5��%>��!_�#Q'�Q�9����p/����e��+�O��8�f�B�P�����3��`ү��Z>6lr�]�Ť���޹�uT��l["�y0NJ�j4�r:l����$8�:�[�(�|��E#]�"~.%�k4e��IQ	���% %�Ԟc�"�����
�x���m�2��It4y�u��|2��$«[X�	.�r�v$a�X�'�^��MI[srU�e��bnW��ס�M�Cގk�6Ł�v�$f�{FY��´���<��.叵�F!��UgNW%�eX�][K�zO+�b= ���&eC.B��Fd�ľE�tCw�(1�.�]#Y�z�W�%u����e�h��E�����x���:��~�Tsw(�՛H$����$5�Ԙ����M��tp���g�,�*\8�˞�^$�N�w��a?\i-[iW�m0$_}a��Xh܂��q�H4F%WFؔ�.G-G���A-M'b7W���&�-OT�X�8M���H��O#)"���nv��~D�Ilظ�+�IU���h�ے6R-J�v�E�(�Z�"���p�z���G�:���l�mm�/�F��o6�*F�Tu;z\�P���U�%G��qNM�]�2����CaqP�6���4W���ILhd��ڏ<�P�G�8���n5��Hh΂��iD�n�d�U���q�0ӎ4��}]����n)ˮ����;4���tBW��#챊R�a�RŒ瞪&š�bs&\�� q��m����gG	�V�`aӭ�Ol�9@Α��a1v�Lr#<`C��4��_����"���$�B��f���3gB}	��@�D��u�p����EHk�4s��F ��Gv�`b+�Us���r7?�|��K����Ƕ+��o�1��E��UKc&��k=�0j�9���	&V�HU�iƜ:��+��F���h_�x`��5~)WPwN;��I���H���d��ϟ񉚐Ik�_?:��$�ʤ�t�Kw��S�
DVsHX�Y|P�/�>l��/w�=�Q>��A��#����CRs�GႽ�)V��|w�y����u	΍p"u�v!��mu1�����2��ҙ��F2���Bd��ͱ@�a���k�"���Y#F�J3�'K��&̀���1�9x�H��������[�_���*1�Wu��1��_�X���+��eo��rk��խm��ĆZe�aǉ�pY>7��"G?e��34#PhYæ\��ua9W�9���@t�V}���@.~kbjL�qhvBLZ�j ]��1;���¹�PDɓ��G~��tX��Ȟ(y�=�sl���v��\����&�Jx�q[��m��ߋo۶��
��p'������y{��%�C�ib����pp?�ǝ�Ѽ:��b�W�I$ʈ\����U���U>�2���E�hW�/+�)�U�!A�AcL�h�e.u���y:=
�}�Kn���A��bZ,��!����hWܚc�@����hU{7O�f�S(�!C���]��^��|�)n���r�����u�|?"ֈ?y�tV�Zr��X��("���QE��b�ɜ�}�c��|0Æ�,vYŒZ��-u����­v��)�wz������+����{�K��w�gA��]�E��HKɅ	XV���W��B�̦�3����sW��i�kԑ[�6j�����-�.�
G��e�}�4ɉpP���B+O,�S�
�p�gɘ;,�%C�1p^�,��0�P�l$>��A��  9>[���7����7�7����T     