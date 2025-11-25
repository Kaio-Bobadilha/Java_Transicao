import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'; 
import { FaUsers, FaUserTie, FaBoxOpen, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';

const Card = ({ title, icon: Icon, path, onClick }) => (
    <div className={styles.card} onClick={() => onClick(path)}>
        <Icon className={styles.cardIcon} />
        <h3 className={styles.cardTitle}>{title}</h3>
    </div>
);

const Home = () => {
    const navigate = useNavigate();

    const handleCardClick = (path) => {
        navigate(path); 
    };

    const handleLogout = () => {
        navigate('/'); 
    };

    const modules = [
        { title: "Clientes", icon: FaUsers, path: "/PesquisaClientes" },
        { title: "Funcionários", icon: FaUserTie, path: "/funcionarios" },
        { title: "Fornecedores", icon: FaBoxOpen, path: "/fornecedores" },
        { title: "Produtos", icon: FaBoxOpen, path: "/produtos" },
        { title: "Vendas", icon: FaShoppingCart, path: "/vendas" },
    ];

    return (
        <div className={styles.homeContainer}>
            <header className={styles.header}>
                <h1 className={styles.mainTitle}>Sistema de Gestão</h1>
                
                <button className={styles.logoutButton} onClick={handleLogout} title="Sair do sistema">
                    <FaSignOutAlt />
                    <span>Sair</span>
                </button>
            </header>
            
            <section className={styles.cardsGrid}>
                {modules.map((module) => (
                    <Card
                        key={module.title}
                        title={module.title}
                        icon={module.icon}
                        path={module.path}
                        onClick={handleCardClick}
                    />
                ))}
            </section>
        </div>
    );
};

export default Home;