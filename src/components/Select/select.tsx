"use client";
import styles from "@/styles/componente.module.css";

interface SelectProps {
    id: string;
    label: string;
    values: string[];
    labels: string[];
    required?: boolean;
    value: string;
    AtualizarEstado: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.FC<SelectProps> = ({ id, label, values, labels, required = false,AtualizarEstado,value }) => {

    if (values.length !== labels.length) {
        console.warn("Values e labels devem ter o mesmo tamanho!");
    }

    return (
        <div className={styles.inputGroup}>
            <select
                id={id}
                required={required}
                value={value}
                onChange={AtualizarEstado}
            >
                <option value="" disabled>{label}</option>
                {values.map((value, index) => (
                    <option key={value} value={value}>
                        {labels[index]}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;
