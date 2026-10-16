import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function MusicNoteOff({ size = 24, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="butt"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M10 17.9999C10 20.071 8.0711 21.9999 6 21.9999C3.9289 21.9999 2 20.071 2 17.9999C2 15.9288 3.9289 13.9999 6 13.9999C6.70699 13.9999 7.39722 14.225 8 14.6034V8.99991H10V17.9999ZM16.0859 15.4189C16.0306 15.6015 16 15.7961 16 15.9999C16 17.1045 16.8954 17.9999 18 17.9999C18.2038 17.9999 18.3985 17.9693 18.5811 17.914L19.1611 19.828C18.7923 19.9398 18.4022 19.9999 18 19.9999C15.7908 19.9999 14 18.2091 14 15.9999C14 15.5977 14.0601 15.2076 14.1719 14.8388L16.0859 15.4189Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M20.835 2.01358C21.1249 1.96526 21.4222 2.04727 21.6465 2.23721C21.8706 2.42721 22 2.70611 22 2.99991V16.3427H20V15.9999L19.9922 15.83C19.9211 14.9912 19.3288 14.2774 18.502 14.0624L17.5332 13.8134L18.0332 11.8769L19.001 12.1269H19.0029C19.3591 12.2193 19.6929 12.3596 20 12.537V4.1796L9.59766 5.91397L9.26953 3.94132L20.835 2.01358Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M1.70715 1.70703L22.293 22.2928"/>
    </svg>
  )
}
