# 🚀 DemandaFlow

O **DemandaFlow** é uma solução Full Stack moderna para o gerenciamento de de demandas. O projeto utiliza uma arquitetura microserviços com um backend robusto em Django e um frontend dinâmico em React, totalmente orquestrados via Docker.

---

## 🛠 Tecnologias
* **Backend:** Python / Django Rest Framework (DRF)
* **Frontend:** React.js
* **Containerização:** Docker & Docker Compose
* **Banco de Dados:** Sqlite

---

## ⚡ Como Iniciar o Projeto

Certifique-se de ter o **Docker** instalado.

1.  **Clone o repositório:**
    ``` bash
        git clone https://github.com/GabrielPSantana/demandaflow.git
        cd demandaflow
    ```

2.  **Suba os containers:**
    ```bash
    docker compose up
    ```

3.  **Acesse as aplicações:**
    * **Frontend:** [http://localhost:5173](http://localhost:5173)
    * **Backend API:** [http://localhost:8000/api/v1/](http://localhost:8000/api/v1/)

---

## 📋 Documentação da API (v1)

A API utiliza **UUID** para identificação e possui suporte nativo a **paginação** e **busca**.

### Endpoints de Tarefas

| Ação | Método | Endpoint |
| :--- | :--- | :--- |
| **Listar / Buscar** | `GET` | `/api/v1/tasks/?page=1&search=` |
| **Ver Detalhes** | `GET` | `/api/v1/tasks/<uuid:id>/` |
| **Criar Nova** | `POST` | `/api/v1/tasks/create/` |
| **Atualizar** | `PUT` | `/api/v1/tasks/update/<uuid:id>/` |
| **Remover** | `DELETE` | `/api/v1/tasks/delete/<uuid:id>/` |

### 📖 Resposta Paginada (Exemplo)
Ao listar tarefas, a API retorna os dados estruturados para paginação:

```json
{
    "count": 27,
    "next": "http://localhost:8000/api/v1/tasks/?page=2&search=",
    "previous": null,
    "results": [
        {
            "task_id": "c177ebb5-057c-4797-9c01-5812df54ed70",
            "title": "Deploy da versão de produção",
            "priority": "HIGH",
            "status": "COMPLETED",
            "time_spent": "06:00:00"
        }
    ]
}