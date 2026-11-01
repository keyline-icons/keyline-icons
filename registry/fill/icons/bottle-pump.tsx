import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function BottlePump({ size = 24, ...props }: IconProps) {
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
      <path d="M8.1135 6.9267C8.3456 6.3657 8.8929 5.9999 9.5 6L14.5 6C15.1071 5.9999 15.6544 6.3657 15.8865 6.9267C15.8883 6.9511 15.8892 6.9756 15.8892 7C15.8892 7.5523 15.4415 8 14.8892 8L9.1108 8C8.5585 8 8.1108 7.5523 8.1108 7C8.1108 6.9756 8.1117 6.9511 8.1135 6.9267ZM9 10L15 10C17.2092 10 19 11.7908 19 14L19 19C19 21.2092 17.2092 23 15 23L9 23C6.7908 23 5 21.2092 5 19L5 14C5 11.7908 6.7908 10 9 10Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" stroke="none"/>
      <path d="M12 2L12 7M9 2L13.1716 2C14.9826 2 16.7194 2.7194 18 4" fill="none"/>
    </svg>
  )
}
