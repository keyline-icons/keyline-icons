import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MessagePen({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12.8419 3.02799C12.5643 3.00939 12.2835 2.99999 12 2.99999C6.4772 2.99999 2 6.58169 2 11C2 12.9769 2.915 14.8839 4.5686 16.353L5 21L9.5808 18.7624C10.3721 18.9202 11.1845 19 12 19C17.5228 19 22 15.4183 22 11C22 10.7234 21.9825 10.4501 21.9482 10.1807M10.5 13.5L14.6248 11.8501L20.4874 5.98739C21.1709 5.30399 21.1709 4.19599 20.4874 3.51259C19.804 2.82909 18.696 2.82909 18.0126 3.51259L12.1499 9.3752L10.5 13.5Z" fill="none"/>
    </svg>
  )
}
