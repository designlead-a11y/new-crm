import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
    label: string;
    onClick?: () => void;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export const Breadcrumb = ({ items }: BreadcrumbProps) => (
    <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <li key={index} className={`breadcrumb-item ${isLast ? 'active' : ''}`} aria-current={isLast ? 'page' : undefined}>
                        {!isLast && item.onClick ? (
                            <button className="breadcrumb-link" onClick={item.onClick}>
                                {item.label}
                            </button>
                        ) : (
                            <span className={!isLast ? 'breadcrumb-link' : ''} style={!isLast ? { cursor: 'default' } : {}}>{item.label}</span>
                        )}
                        {!isLast && (
                            <span className="breadcrumb-separator">
                                <ChevronRight size={14} />
                            </span>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);
