import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Tower({ size = 24, ...props }: IconProps) {
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
      <path d="M17.9986 21.9976H21.9976M17.9986 21.9976V8.0009M17.9986 21.9976H13.9995H10.0005H6.0014M17.9986 8.0009H6.0014M17.9986 8.0009H19.3469C19.8414 8.0009 20.0357 7.3611 19.6242 7.0812L12.2773 2.0824C12.1094 1.9724 11.8906 1.9724 11.7227 2.0824L4.3758 7.0812C3.9643 7.3611 4.1586 8.0009 4.6531 8.0009H6.0014M6.0014 21.9976H2.0024M6.0014 21.9976V8.0009M10.5004 17.9986H13.4996C13.7757 17.9986 13.9995 17.7786 13.9995 17.4987V13.9995C13.9995 12.8998 13.1043 12 12 12C10.8957 12 10.0005 12.8998 10.0005 13.9995V17.4987C10.0005 17.7786 10.2243 17.9986 10.5004 17.9986Z"/>
    </svg>
  )
}
