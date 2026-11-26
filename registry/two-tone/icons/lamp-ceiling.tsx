import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function LampCeiling({ size = 24, ...props }: IconProps) {
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
      <path d="M7.1 19L5.5025 19C4.5076 19 3.7066 18.4388 3.3007 17.684C2.8948 16.9292 2.8683 15.9515 3.4169 15.1216L6.8692 9.8977C7.2392 9.3359 7.867 9 8.5378 9L15.4622 9C16.133 9 16.7608 9.3359 17.1316 9.8989L20.5832 15.1217C21.1317 15.9515 21.1052 16.9292 20.6993 17.684C20.2934 18.4388 19.4924 19 18.4975 19L16.9 19C16.4367 21.2822 14.4189 23 12 23C9.5811 23 7.5633 21.2822 7.1 19Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M9 2L15 2M12 2L12 10M7.7035 10.449C7.8886 10.168 8.202 10 8.5378 10L15.4622 10C15.798 10 16.1114 10.168 16.2965 10.449L19.7489 15.673C20.4079 16.67 19.6928 18 18.4975 18L5.5025 18C4.3072 18 3.5921 16.67 4.2511 15.673L7.7035 10.449ZM8 18C8 20.2091 9.7909 22 12 22C14.2091 22 16 20.2091 16 18"/>
    </svg>
  )
}
