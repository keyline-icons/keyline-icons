import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function CassetteTape({ size = 24, ...props }: IconProps) {
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
      <path d="M5 3L19 3C21.2092 3 23 4.7908 23 7L23 17C23 19.2092 21.2092 21 19 21L5 21C2.7908 21 1 19.2092 1 17L1 7C1 4.7908 2.7908 3 5 3Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M10 10C10 11.1046 9.1046 12 8 12C6.8954 12 6 11.1046 6 10C6 8.8954 6.8954 8 8 8C9.1046 8 10 8.8954 10 10ZM18 10C18 11.1046 17.1046 12 16 12C14.8954 12 14 11.1046 14 10C14 8.8954 14.8954 8 16 8C17.1046 8 18 8.8954 18 10ZM8 12L16 12" fill="none"/>
      <path d="M4.5048 20.9696L6.4283 16.4162C6.663 15.8609 7.2072 15.5 7.8101 15.5L16.1899 15.5C16.7928 15.5 17.337 15.8609 17.5717 16.4163L19.4952 20.9696C19.3309 20.9899 19.1655 21 19 21L17.3369 21L15.8584 17.5L8.1416 17.5L6.6631 21L5 21C4.8345 21 4.6691 20.9899 4.5048 20.9696Z" fill="currentColor" stroke="none"/>
    </svg>
  )
}
