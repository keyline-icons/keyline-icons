import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Clock10({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 1C18.0751 1 23 5.9249 23 12C23 18.0751 18.0751 23 12 23C5.9249 23 1 18.0751 1 12C1 5.9249 5.9249 1 12 1ZM13 6C13 5.4477 12.5523 5 12 5C11.4477 5 11 5.4477 11 6L11 10.2679L8.1699 8.634C7.9402 8.5014 7.6673 8.4654 7.4111 8.5341C7.1549 8.6027 6.9365 8.7703 6.8039 9C6.5277 9.4783 6.6916 10.0899 7.1699 10.366L11.5 12.866C11.8094 13.0447 12.1906 13.0447 12.5 12.866C12.8094 12.6874 13 12.3573 13 12L13 6Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"/>
    </svg>
  )
}
