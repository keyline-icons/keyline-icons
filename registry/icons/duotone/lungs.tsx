import type { SVGProps } from "react"

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  /** Rendered box in px, set as both width and height. Defaults to 24. */
  size?: number | string
}

export function Lungs({ size = 24, ...props }: IconProps) {
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
      <path d="M10.9693 12.3313L10.1064 20.0976C10.0141 20.9285 9.4147 21.6143 8.6037 21.817L4.1105 22.9403C3.9519 22.98 3.789 23 3.6255 23C2.8299 23 2.11 22.5285 1.7921 21.7992C1.2696 20.6008 1 19.3074 1 18C1 14.1716 3.2962 10.7166 6.826 9.2341C7.1938 9.0796 7.5887 9 7.9877 9C9.6445 9 10.9877 10.3431 10.9877 12C10.9877 12.1107 10.9816 12.2213 10.9693 12.3313ZM13.0307 12.3313C13.0184 12.2213 13.0123 12.1107 13.0123 12C13.0123 10.3431 14.3555 9 16.0123 9C16.4113 9 16.8062 9.0796 17.174 9.2341C20.7038 10.7166 23 14.1716 23 18C23 19.3074 22.7304 20.6008 22.2079 21.7992C21.89 22.5285 21.1701 23 20.3745 23C20.211 23 20.0481 22.98 19.8895 22.9403L15.3963 21.817C14.5853 21.6143 13.9859 20.9285 13.8936 20.0976L13.0307 12.3313Z" fill="currentColor" fillOpacity="0.4" stroke="none"/>
      <path d="M12 2L12 6M12 6L9.0995 10.3375M12 6L14.9005 10.3375M9.7778 14C8.7315 14.1548 7.7785 14.6886 7.1 15.5M14.2222 14C15.2685 14.1548 16.2215 14.6886 16.9 15.5"/>
    </svg>
  )
}
