export const verificarPermissaoAdministrador = (req, res, next) => {
    // A lógica aqui deve garantir que o usuário tem o papel de 'Administrador'
    if (req.user && req.user.role === 'Administrador') {
        next(); // O usuário é administrador, então a requisição continua
    } else {
        return res.status(403).json({ error: 'Acesso negado. Somente administradores podem criar funcionários.' });
    }
};
